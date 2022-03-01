import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Row, Button } from "react-bootstrap";


function GenreView(props) {
  const { Genre, onBackClick } = props;

  return (
    <Container>
      <br /><br />
      <Row className="genre-view">
        <Card className=" bg-dark text-white movie_card">
          <Card.Body>
            <Card.Title>{Genre.Name}</Card.Title>
            <Card.Text>{Genre.Description}</Card.Text>
            <br />
            <Button variant="light" className="button" onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default GenreView;