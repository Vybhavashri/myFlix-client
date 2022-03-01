import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import './login-view.scss';

function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://myflix-moviedatabaseapp.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user')
          alert('Cannot Login. Try again')
        });
    }
  };

  return (
    <Form>
      <br /><br />
      <Row>
        <Col md={8}>
          <Form.Group controlId="formUsername" >
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group >
        </Col>
        <br />
        <Col md={8}>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={4}>
          <Button variant="primary" className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Col>
        <Col md={4}>
          <Link to={'/register'}>
            <Button variant='info' className="btn btn-info btn-block">Register</Button>
          </Link>
        </Col>
      </Row>
    </Form >
  )
}

export default LoginView;