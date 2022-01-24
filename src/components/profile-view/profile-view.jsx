import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      EmailID: null,
      Birth: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          EmailID: response.data.EmailID,
          Birth: response.data.Birth,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

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
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

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

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmailID(value) {
    this.setState({
      EmailID: value,
    });
    this.EmailID = value;
  }

  setBirth(value) {
    this.setState({
      Birth: value,
    });
    this.Birth = value;
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, EmailID, Birth } = this.state;

    return (
      <Container className="profile-view" align="center">
        <br /><br /><br /><br /><br />
        <Card className="user-profile">
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            <div className="profile-container">
              <span className="label">Username: </span>
              <span className="value">{Username}</span>
              <br />
              <br />
              <span className="label">EmailID: </span>
              <span className="value">{EmailID}</span>
              <br />
              <br />
              <span className="label">Birth: </span>
              <span className="value">{Birth}</span>
            </div>
          </Card.Text>
        </Card>
        <br />
        <Card className="update-profile">
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
            <Form className="update-form" onSubmit={(e) => this.editUser(e, this.Username, this.Password, this.EmailID, this.Birth)}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>EmailID</Form.Label>
                <Form.Control type="email" name="Email" placeholder="Enter EmailID" onChange={(e) => this.setEmailID(e.target.value)} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birth</Form.Label>
                <Form.Control type="date" name="Birth" onChange={(e) => this.setBirth(e.target.value)} />
              </Form.Group>
              <br />
              <Button variant="outline-primary" className="btn-outline-primary" type="submit" onClick={this.editUser}>Update User</Button>
              <Button variant="outline-danger" onClick={() => this.onDeleteUser()} > Delete User </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <div className="homeButton">
          <Link to={`/`}>
            <Button variant="outline-primary">Home</Button>
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