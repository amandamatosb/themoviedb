'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import styles from './Home.module.css'
import MovieCard from 'app/components/MovieCard/MovieCard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Api} from 'app/hooks/Api'

type PopularTab = 'streaming' | 'on-tv' | 'for-rent' | 'in-theater';

export default function Popular(){
  const [activeTab, setActiveTab] = useState<PopularTab>('streaming');

  const type = activeTab === 'on-tv' ? 'tv' : 'movie';

  let url = '';
      
  switch(activeTab) {
    case 'streaming':
      url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
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

  const {data: movies, loading, error } = Api(url);

  if (error) return <div>{error}</div>;

  return (
    <section className={styles.popular}>
    
      <div className={styles.title}>
        <h2 className="font-semibold text-xl">What's Popular</h2>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PopularTab)}>
            <TabsList className="bg-transparent">
              <TabsTrigger value="streaming" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">Streaming</TabsTrigger>
              <TabsTrigger value="on-tv" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">On Tv</TabsTrigger>
              <TabsTrigger value="for-rent" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">For rent</TabsTrigger>
              <TabsTrigger value="in-theater" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">In Theaters</TabsTrigger>
            </TabsList>
        
        </Tabs>

      </div>

      {loading ? (<CarouselSkeleton />) 
      
      : (
        <div className={styles.moviecontainer}>
          {movies.map((movie: Movie) => {

            return(
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name}
                poster_path={movie.poster_path}
                release_date={movie.release_date || movie.first_air_date}
                media_type={type}
                vote_average={movie.vote_average}
              />
            );
            
          })}
        </div>
      )}
      
    </section>
    );
}
