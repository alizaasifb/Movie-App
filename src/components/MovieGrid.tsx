import { useEffect, useState } from "react";
import Movie, { MovieProps } from "./Movie";
import MoviePopup from "./MoviePopup.tsx";

interface MovieGridProps {
  movies_type: string
}

function MovieGrid({ movies_type }: MovieGridProps) {
 
  const [movies, setMovies] = useState<MovieProps[]>([]); 
  const [popupVisible, setPopupVisibility] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

  
  const onSelectItem = (movie: MovieProps) => {
    setPopupVisibility(true);
    setSelectedMovie(movie);
  };

  let movie_URL: string;
  const validMovieTypes: { [key: string]: string } = {
    "Most Popular": "popular",
    "Upcoming": "upcoming",
    "Now Playing": "now_playing"
  };
  const validGenres: { [key: string]: number } = {
    "Action": 28,
    "Comedy": 35,
    "Horror": 27,
    "Romance": 10749,
    "Scifi": 878
  };
  
  if (validMovieTypes[movies_type] != undefined) {
    movie_URL = `https://api.themoviedb.org/3/movie/${validMovieTypes[movies_type]}?api_key=fb689239c3381b74420218751342bbad`;
  } else if (validGenres[movies_type] !== undefined) {
    movie_URL = `https://api.themoviedb.org/3/discover/movie?api_key=fb689239c3381b74420218751342bbad&with_genres=${validGenres[movies_type]}`;
  } else {
    console.error('Invalid movies_type');
    movie_URL = '';
  }
  
  useEffect(() => {
    if (movie_URL) {
      fetch(movie_URL)
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [movie_URL, movies_type]);

  return (
    <>

      <center>
        <h1> {movies_type + " Movies"} </h1>
      </center>
      <br></br>
    
      {movies.length == 0 && <div></div>} 
      { popupVisible && selectedMovie && <MoviePopup movie={selectedMovie} 
        onClose={() => setPopupVisibility(false)} > </MoviePopup> }
      <div className="container-fluid text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-start">
          {movies.map((item) => (
          <div key={item.id} onClick={() => onSelectItem(item)}>
            <Movie isBookmarked={false} id={item.id} title={item.title} overview={item.overview} poster_path={item.poster_path} />
          </div>
        ))}
      </div>
    </div>    
    </>
  );
}

export default MovieGrid;