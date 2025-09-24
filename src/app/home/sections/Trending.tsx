'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import styles from './Home.module.css'
import MovieCard from 'app/components/MovieCard/MovieCard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Api } from 'app/hooks/Api'

type TrendTab = 'day' | 'week';

export default function Trending(){

  const [timeWindow, setTimeWindow] = useState<TrendTab>('day');
  const {data: movies, loading, error } = Api(`https://api.themoviedb.org/3/trending/all/${timeWindow}`);

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

      {loading ? ( <CarouselSkeleton/>)
      : (
        <div className={styles.moviecontainer}>
          {movies.map((movie: Movie) => {
            if (movie.media_type === 'person' || !movie.poster_path) {return null};

            return(
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name}
                poster_path={movie.poster_path}
                release_date={movie.release_date || movie.first_air_date}
                media_type={movie.media_type}
                vote_average={movie.vote_average}
              />
            );
          })}
        </div> 
      )}
      
    </section>
  );
}