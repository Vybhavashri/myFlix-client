import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Container, Card, Row, Button } from "react-bootstrap";

import { Link } from 'react-router-dom';

import "./genre-view.scss";

function GenreView(props) {
  const { Genre, onBackClick } = props;

  return (
    <Container>
      <br /><br /><br /><br /><br />
      <Row className="genre-view">
        <Card align="center">
          <Card.Body>
            <Card.Title>{Genre.Name}</Card.Title>
            <Card.Text>{Genre.Description}</Card.Text>
            <br />
            <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
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
  }).isRequired
};

export default GenreView;