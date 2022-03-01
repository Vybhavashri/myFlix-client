import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import NavBarView from '../navbar-view/navbar-view';
import MoviesList from '../movies-list/movies-list';

import { Row, Col } from 'react-bootstrap';

import { setMovies } from '../../actions/actions';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userData: {}
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUser(authData.token);
    window.open('/', '_self')
  }

  getMovies(token) {
    axios.get('https://myflix-moviedatabaseapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data.sort((a, b) => b.ReleaseYear - a.ReleaseYear));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios.get('https://myflix-moviedatabaseapp.herokuapp.com/users/' + localStorage.getItem('user'), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegistration(registration) {
    this.setState({
      registration,
    });
  }


  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} userData={this.state.userData} />;
          }} />

          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegistration={(user) => this.onRegistration(user)} />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavBarView />
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} userData={this.state.userData} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/movies/genre/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavBarView />
              <GenreView Genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/movies/directors/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavBarView />
              <DirectorView Director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/users/:Username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavBarView />
              <ProfileView userData={this.state.userData} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    userData: state.userData
  }
}

export default connect(mapStateToProps, { setMovies })(MainView);