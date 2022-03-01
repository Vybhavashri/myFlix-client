import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Row, Button } from "react-bootstrap";
import Moment from 'moment';

function DirectorView(props) {
  const { Director, onBackClick } = props;

  return (
    < Container >
      <br /><br />
      <Row className="director-view">
        <Card className=" movie_card_background bg-dark text-white movie_card">
          <Card.Body>
            <Card.Title>{Director.Name}</Card.Title>
            <Card.Text>{Director.Bio}</Card.Text>
            <Card.Text>{Moment(Director.Birth).format('DD-MM-YYYY')}</Card.Text>
            <br />
            <Button variant="light" className="button" onClick={() => { onBackClick(null); }}>Back</Button>
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