'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import styles from './Home.module.css'
import Moviecard from 'app/components/MovieCard/Moviecard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'

type PopularTab = 'streaming' | 'on-tv' | 'for-rent' | 'in-theater';

export default function Popular(){
  const [activeTab, setActiveTab] = useState<PopularTab>('streaming');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);

      let url = '';

      switch(activeTab) {
        case 'streaming':
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_watch_monetization_types=flatrate';
          break;
        case 'on-tv':
          url = 'https://api.themoviedb.org/3/tv/on_the_air?page=1';
          break;
        case 'for-rent':
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&with_watch_monetization_types=rent';
          break;
        case 'in-theater':
          url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
          break;
        default: 
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_watch_monetization_types=flatrate';
      }
    
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGMxYzFiZDU3MzY2NTgyNjNjMzc0MWFiZmY1NGJmNCIsIm5iZiI6MTc1NzUyNzg0Mi4wNTksInN1YiI6IjY4YzFiZjIyYjRiNDc0MDAwYzFmNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Ir2TNtVmhW7IZR00ChUh7Y_JeZoy7-V71jE61mLRio'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Falha na resposta da API');
        }
        const data = await response.json();
        
        setMovies(data.results);
      }

      catch (err) {
        setError('Falha ao carregar.');
        console.error(err);
      }

      finally{
        setLoading(false);
      }
    } 

    fetchPopular();

  }, [activeTab]);

  if (error) return <div>{error}</div>;
	if (loading) return (
		<section className={styles.popular}>

			<div className={styles.title}>
				<h2 className="font-semibold text-xl">What's Popular</h2>

				<div>/Streaming/</div>
				<div>/On Tv/</div>
				<div>/For Rent/</div>
				<div>/In Theaters/</div>

			</div>

			<CarouselSkeleton />

		</section> 

	);

  return (
    <section className={styles.popular}>
    
      <div className={styles.title}>
        <h2 className="font-semibold text-xl">Popular</h2>
        <button onClick={() => setActiveTab('streaming')} className={activeTab === 'streaming' ? 'active' : ''}>
          /Streaming/
        </button>
        <button onClick={() => setActiveTab('on-tv')} className={activeTab === 'on-tv' ? 'active' : ''}>
          /On Tv/
        </button>
        <button onClick={() => setActiveTab('for-rent')} className={activeTab === 'for-rent' ? 'active' : ''}>
          /For Rent/
        </button>
        <button onClick={() => setActiveTab('in-theater')} className={activeTab === 'in-theater' ? 'active' : ''}>
          /In Theaters/
        </button>
      </div>

      <div className={styles.moviecontainer}>
        {movies.map((movie: Movie) => {

          return(
            <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name}
            poster_path={movie.poster_path}
            release_date={movie.release_date || movie.first_air_date}
            media_type={movie.media_type}
            />
          );

        })}

      </div>
    </section>
    );
}
