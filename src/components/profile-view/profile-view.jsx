import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from 'moment';

class ProfileView extends React.Component {

  render() {
    const { userData } = this.props;
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Allow user to edit or update profile
    const editUser = (e) => {
      e.preventDefault();

      axios.put(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          EmailID: this.state.EmailID,
          Birth: this.state.Birth,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          this.setState({
            Username: response.data.Username,
            Password: response.data.Password,
            EmailID: response.data.EmailID,
            Birth: response.data.Birth,
          });

          localStorage.setItem("user", this.state.Username);
          const data = response.data;
          console.log(this.state.Username);
          alert("Profile is updated!");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // Deregister
    const onDeleteUser = () => {

      axios.delete(`https://myflix-moviedatabaseapp.herokuapp.com/users/delete/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          alert("Profile has been deleted!");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.open(`/`, "_self");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const setUsername = (value) => {
      this.setState({
        Username: value,
      });
      this.Username = value;
    }

    const setPassword = (value) => {
      this.setState({
        Password: value,
      });
      this.Password = value;
    }

    const setEmailID = (value) => {
      this.setState({
        EmailID: value,
      });
      this.EmailID = value;
    }

    const setBirth = (value) => {
      this.setState({
        Birth: value,
      });
      this.Birth = value;
    }

    return (
      <Container className="profile-view" align="center">
        <br /><br /><br /><br /><br />
        <Card className="user-profile bg-dark text-white">
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            <div className="profile-container">
              <span className="label">Username: </span>
              <span className="value">{Username}</span>
              <br />
              <span className="label">EmailID: </span>
              <span className="value">{userData.EmailID}</span>
              <br />
              <span className="label">Birth: </span>
              <span className="value">{Moment(userData.Birth).format('DD-MMM-YYYY')}</span>
            </div>
          </Card.Text>
        </Card>
        <br />
        <Card className="update-profile bg-dark text-white">
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
            <Form className="update-form" onSubmit={(e) => editUser(e, this.Username, this.Password, this.EmailID, this.Birth)}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="Username" placeholder="New Username" onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>EmailID</Form.Label>
                <Form.Control type="email" name="Email" placeholder="Enter EmailID" onChange={(e) => setEmailID(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birth</Form.Label>
                <Form.Control type="date" name="Birth" onChange={(e) => setBirth(e.target.value)} />
              </Form.Group>
              <br />
              <Button variant="info" className="button" type="submit">Update Profile</Button>
              <Button variant="danger" className="button" onClick={() => onDeleteUser()} > Delete Profile </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <div className="homeButton">
          <Link to={`/`}>
            <Button variant="primary">Home</Button>
          </Link>
        </div>
        <br />
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    EmailID: PropTypes.string.isRequired,
    Birth: PropTypes.string,
    FavouriteMovies: PropTypes.array
  }),
};

export default ProfileView;