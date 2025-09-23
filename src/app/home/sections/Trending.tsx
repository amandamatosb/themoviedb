'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import styles from './Home.module.css'
import Moviecard from 'app/components/MovieCard/Moviecard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TrendTab = 'day' | 'week';

export default function Trending(){

  const [timeWindow, setTimeWindow] = useState<TrendTab>('day');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
    
      const url = `https://api.themoviedb.org/3/trending/all/${timeWindow}`;
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

    fetchTrending();

  }, [timeWindow]);

  if (error) return <div>{error}</div>;

 return (
    <section className={styles.trending}>
    
      <div className={styles.title}>
        <h2 className="font-semibold text-xl">Trending</h2>
      
        <Tabs value={timeWindow} onValueChange={(value) => setTimeWindow(value as TrendTab)} >
          <TabsList className="bg-transparent">
            <TabsTrigger value="day" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">Today</TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">This Week</TabsTrigger>
          </TabsList>


        </Tabs>

    </div>

      {loading ? ( < CarouselSkeleton />)
      
      : (
        <div className={styles.moviecontainer}>
          {movies.map((movie: Movie) => {
          
            if (movie.media_type === 'person' || !movie.poster_path) {return null};

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
      )}
    </section>
  );
}
