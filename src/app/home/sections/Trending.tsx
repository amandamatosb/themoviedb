import React from 'react'
import styles from './Home.module.css'
import Moviecard from 'app/components/MovieCard/Moviecard'
import { Movie } from 'app/types'

const Trending = async () => {

  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGMxYzFiZDU3MzY2NTgyNjNjMzc0MWFiZmY1NGJmNCIsIm5iZiI6MTc1NzUyNzg0Mi4wNTksInN1YiI6IjY4YzFiZjIyYjRiNDc0MDAwYzFmNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Ir2TNtVmhW7IZR00ChUh7Y_JeZoy7-V71jE61mLRio'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results; 

    return (
      <div className= {styles.moviecontainer}>
        {movies.map((movie : Movie) => (
        <Moviecard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
        />
      ))}
      </div>
    )
  }

  catch (error) {
    return <div>Falha ao carregar filmes.</div>
  }
  
}

export default Trending