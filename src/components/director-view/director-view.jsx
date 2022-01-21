import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Row, Button } from "react-bootstrap";

import "./director-view.scss";

function DirectorView(props) {
  const { Director, onBackClick } = props;

  return (
    < Container >
      <br /><br /><br /><br /><br />
      <Row className="director-view">
        <Card align="center">
          <Card.Body>
            <Card.Title>{Director.Name}</Card.Title>
            <Card.Text>{Director.Bio}</Card.Text>
            <Card.Text>{Director.Birth}</Card.Text>
            <br />
            <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container >
  )
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired
};

export default DirectorView;