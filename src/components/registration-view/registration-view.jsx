import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Row, Col, Form, Button } from 'react-bootstrap';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailID, setEmailID] = useState('');
  const [birth, setBirth] = useState('');

  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailIDErr: ''
  })

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    }
    else if (username.length < 5) {
      setValues({ ...values, usernameErr: 'Username must be 5 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    }
    else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
      isReq = false;
    }
    if (!emailID) {
      setValues({ ...values, emailIDErr: 'EmailID Required' });
      isReq = false;
    }
    else if (emailID.indexOf('@') === -1) {
      setValues({ ...values, emailIDErr: 'Invalid EmailID' });
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://myflix-moviedatabaseapp.herokuapp.com/users', {
        Username: username,
        Password: password,
        EmailID: emailID,
        Birth: birth
      })
        .then(response => {
          const data = response.data;
          alert('Registration successful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register')
        });
    }
  };

  return (
    <Form>
      <Row>
        <Col md={8}>
          <br /><br /><br />
          <h3>Sign Up</h3>
          <p></p>
          <Form.Group controlId='formUsername' className='reg-form-inputs'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formPassword' className='reg-form-inputs'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId='EmailID' className='reg-form-inputs'>
            <Form.Label>EmailID</Form.Label>
            <Form.Control type='email' value={emailID} onChange={e => setEmailID(e.target.value)} />
            {values.emailIDErr && <p>{values.emailIDErr}</p>}
          </Form.Group>

          <Form.Group controlId='updateBirthday' className='reg-form-inputs'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type='date' value={birth} onChange={e => setBirth(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={4}>
          <Button variant='info' type='submit' className="btn btn-info btn-block" onClick={handleSubmit}>Register</Button>
        </Col>
        <Col md={4}>
          <Link to={'/'}>
            <Button variant='primary' className="btn btn-primary btn-block">Login</Button>
          </Link>
        </Col>
      </Row>
    </Form >
  );
}

RegistrationView.propTypes = {
  registeration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    EmailID: PropTypes.string.isRequired,
    Birth: PropTypes.date
  })
};

export default RegistrationView;