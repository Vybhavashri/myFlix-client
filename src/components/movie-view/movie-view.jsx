import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MovieView extends React.Component {

  addToFavs() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { movie } = this.props;

    axios.post(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        console.log(movie._id);
        alert("The movie is now on your list.");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFromFavs() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { movie } = this.props;

    axios.delete(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}/delete/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        console.log(movie._id);
        alert("The movie is now deleted from your list.");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      < Container>
        <br /><br /><br /><br /><br />
        <Row>
          <Card align="center">
            <Card.Img variant="top" src={movie.Poster} crossOrigin="true" width="250" height="350" />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <label>Genre:</label>
              <Link to={`/movies/genre/${movie.Genre.Name}`}>
                <span className="value">{movie.Genre.Name}</span>
              </Link>
              <br />
              <label>Director:</label>
              <Link to={`/movies/directors/${movie.Director.Name}`}>
                <span className="value">{movie.Director.Name}</span>
              </Link>
              <br />
            </Card.Body>
          </Card>
          <div align="center">
            <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
            <Button variant="outline-success" className="btn-outline-primary" onClick={() => { this.addToFavs(); }}>Add to Favorite</Button>
            <Button variant="outline-danger" className="btn-outline-primary" onClick={() => { this.removeFromFavs(); }}>Remove from Favorite</Button>
          </div>
        </Row>
      </Container >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool,
    ReleaseYear: PropTypes.number,
    Actors: PropTypes.array,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    Poster: PropTypes.string.isRequired
  })
};

export default MovieView;