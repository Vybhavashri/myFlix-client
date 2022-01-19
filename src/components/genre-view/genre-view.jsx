import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";

import { Link } from 'react-router-dom';

import "./genre-view.scss";

function GenreView(props) {
  const { Genre } = props;

  console.log(Genre, 'genre')

  return (
    <Row className="genre-view">
      <Col>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{Genre.Description}</span>
        </div>
        <Link to={`/`}>
          <Button className='returnButton' variant='dark'>Return</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default GenreView;