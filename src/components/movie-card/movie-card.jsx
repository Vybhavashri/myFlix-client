import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {

  render() {
    let { movie, userData } = this.props;

    return (
      <Card className="bg-transparent movie_card_background ">
        <Card key={movie._id} className="bg-dark text-white movie_card">
          <Card.Img variant="top" src={movie.Poster} crossOrigin="true" alt="Card image" className="card_image" />
          <Card.ImgOverlay className="image-overlay">
            <Card.Title className="card-title_image-overlay ">{movie.Title}</Card.Title>
          </Card.ImgOverlay>
        </Card>
        <Link to={`/movies/${movie._id}`} className="text-right text-white">
          <Button variant="link" size="lg">Show more...</Button>
        </Link>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Poster: PropTypes.string.isRequired,
  }).isRequired
};

export default MovieCard;