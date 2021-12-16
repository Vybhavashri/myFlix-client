import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

let imgPath = '../../img/';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { "_id": { "$oid": "6192c3afdb50bdac425b73ba" }, "Poster": imgPath + "The Shawshank Redemption.jpg", "Title": "The Shawshank Redemption", "Genre": { "Name": "Drama", "Description": "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters." }, "Featured": true, "ReleaseYear": 1994, "Actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"], "Director": { "Name": "Frank Darabont", "Bio": "Writer, Producer, Writer. Three-time Oscar nominee.", "Birth": { "$date": { "$numberLong": "-344739600000" } } } },
        { "_id": { "$oid": "6192c3afdb50bdac425b73bb" }, "Poster": imgPath + "The Godfather.jpg", "Title": "The Godfather", "Genre": { "Name": "Crime", "Description": "Crime films are almost always dramatic in nature, encompassing the many angles of both enforcing and breaking the law." }, "Director": { "Name": "Francis Ford Coppola", "Bio": "His first two Oscar-winning screenplays were for Patton(1970) and The Godfather(1972).", "Birth": { "$date": { "$numberLong": "-969930000000" } } }, "Featured": true, "ReleaseYear": 1972, "Actors": ["Marlon Brando", "Al Pacino", "James Caan"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73bc" }, "Poster": imgPath + "The Godfather Part II.jpg", "Title": "The Godfather: Part II", "Genre": { "Name": "Crime", "Description": "Crime films are almost always dramatic in nature, encompassing the many angles of both enforcing and breaking the law." }, "Director": { "Name": "Francis Ford Coppola", "Bio": "His first two Oscar-winning screenplays were for Patton(1970) and The Godfather(1972).", "Birth": { "$date": { "$numberLong": "-969930000000" } } }, "Featured": true, "ReleaseYear": 1974, "Actors": ["Al Pacino", "Robert De Niro", "Robert Duvall"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73bd" }, "Poster": imgPath + "The Godfather Part III.jpg", "Title": "The Godfather: Part III", "Genre": { "Name": "Crime", "Description": "Crime films are almost always dramatic in nature, encompassing the many angles of both enforcing and breaking the law." }, "Director": { "Name": "Francis Ford Coppola", "Bio": "His first two Oscar-winning screenplays were for Patton(1970) and The Godfather(1972).", "Birth": { "$date": { "$numberLong": "-969930000000" } } }, "Featured": true, "ReleaseYear": 1990, "Actors": ["Al Pacino", "Diane Keaton", "Andy Garcia"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73be" }, "Poster": imgPath + "The Dark Knight.jpg", "Title": "The Dark Knight", "Genre": { "Name": "Adventure", "Description": "The adventure genre is based on story-telling,that weave richly detailed settings together with a plot based on a journey or quest." }, "Director": { "Name": "Christopher Nolan", "Bio": "Born and raised in London, Nolan developed an interest in filmmaking from a young age.", "Birth": { "$date": "1970-07-30T00:00:00Z" } }, "Featured": true, "ReleaseYear": 2008, "Actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73bf" }, "Poster": imgPath + "The Lord of the Rings The Return of the King.jpg", "Title": "The Lord of the Rings: The Return of the King", "Genre": { "Name": "Drama", "Description": "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters." }, "Director": { "Name": "Peter Jackson", "Bio": "Made history with The Lord of the Rings trilogy.", "Birth": { "$date": { "$numberLong": "-257817600000" } } }, "Featured": true, "ReleaseYear": 2003, "Actors": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73c0" }, "Poster": imgPath + "Batman Begins.jpg", "Title": "Batman Begins", "Genre": { "Name": "Adventure", "Description": "The adventure genre is based on story-telling,that weave richly detailed settings together with a plot based on a journey or quest." }, "Director": { "Name": "Christopher Nolan", "Bio": "Best known for his cerebral, often nonlinear, storytelling.", "Birth": { "$date": "1970-07-30T00:00:00Z" } }, "Featured": true, "ReleaseYear": 2005, "Actors": ["Christian Bale", "Michael Caine", "Ken Watanabe"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73c1" }, "Poster": imgPath + "The Dark Knight Rises.jpg", "Title": "The Dark Knight Rises", "Genre": { "Name": "Adventure", "Description": "The adventure genre is based on story-telling,that weave richly detailed settings together with a plot based on a journey or quest." }, "Director": { "Name": "Christopher Nolan", "Bio": "Best known for his cerebral, often nonlinear, storytelling.", "Birth": { "$date": "1970-07-30T00:00:00Z" } }, "Featured": true, "ReleaseYear": 2012, "Actors": ["Christian Bale", "Tom Hardy", "Anne Hathaway"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73c2" }, "Poster": imgPath + "The Lord of the Rings The Fellowship of the Ring.jpg", "Title": "The Lord of the Rings: The Fellowship of the Ring", "Genre": { "Name": "Drama", "Description": "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters." }, "Director": { "Name": "Peter Jackson", "Bio": "Made history with The Lord of the Rings trilogy.", "Birth": { "$date": { "$numberLong": "-257817600000" } } }, "Featured": true, "ReleaseYear": 2001, "Actors": ["Elijah Wood", "Ian McKellen", "Orlando Bloom"] },
        { "_id": { "$oid": "6192c3afdb50bdac425b73c3" }, "Poster": imgPath + "Schindler's List.jpg", "Title": "Schindler's List", "Genre": { "Name": "Biography", "Description": "Biographies are stories of real or fictional people that are mostly drama, while others delve into serious issues such as politics, illness, substance abuse, and relationships." }, "Director": { "Name": "Steven Spielberg", "Bio": "One of the most influential personalities in the history of cinema.", "Birth": { "$date": { "$numberLong": "-727056000000" } } }, "Featured": true, "ReleaseYear": 1993.0, "Actors": ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"] }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
}
export default MainView;