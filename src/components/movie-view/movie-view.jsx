import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, userData } = this.props;
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const addToFavs = (e) => {
      e.preventDefault();
      axios.post(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          alert("The movie is now on your list.");
          window.open('/movies', '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const removeFromFavs = (e) => {
      e.preventDefault();
      axios.delete(`https://myflix-moviedatabaseapp.herokuapp.com/users/${Username}/delete/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          alert("The movie is now deleted from your list.");
          window.open('/movies', '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      < Container>
        <br /><br />
        <Card align="center">
          <Card.Img variant="top" src={movie.Poster} crossOrigin="true" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <label>Genre : </label>
            <Link to={`/movies/genre/${movie.Genre.Name}`}>
              <span className="value">{movie.Genre.Name}</span>
            </Link>
            <br />
            <label>Director : </label>
            <Link to={`/movies/directors/${movie.Director.Name}`}>
              <span className="value">{movie.Director.Name}</span>
            </Link>
            <br />
            <div className="movie-featured">
              <span className="label">Featured : </span>
              <span className="value">{movie.Featured}</span>
            </div>
            <br />
            <div className="movie-releaseyear">
              <span className="label">Release Year : </span>
              <span className="value">{movie.ReleaseYear}</span>
            </div>
            <br />
            <div className="movie-actors">
              <span className="label">Actors : </span>
              <span className="value">{movie.Actors}</span>
            </div>
          </Card.Body>
          {userData.FavouriteMovies.includes(movie._id)
            ? <Button className="button" variant="danger" onClick={removeFromFavs}>Remove favourites</Button>
            : <Button className="button" variant="success" onClick={addToFavs}>Add to favourites</Button>
          }
          <br />
          <Button className="button" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card>
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