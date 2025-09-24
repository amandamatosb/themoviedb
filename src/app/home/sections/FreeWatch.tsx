'use client'

import React, { use } from 'react'
import styles from './Home.module.css'
import {useState, useEffect} from 'react'
import MovieCard from 'app/components/MovieCard/MovieCard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Api } from 'app/hooks/Api'

type FreeTab = 'tv' | 'movie';

export default function FreeWatch(){
	const [timeWindow, setTimeWindow] = useState('movie');

  const type = timeWindow === 'tv' ? 'tv' : 'movie';
	const url = `https://api.themoviedb.org/3/discover/${timeWindow}?include_adult=false&with_watch_monetization_types=free&primary_release_date.lte=2025-09-17&sort_by=vote_average.desc&vote_count.gte=1000`;
	
  const {data: movies, loading, error } = Api(url);

	if (error) return <div>{error}</div>;

	return (
		<section className={styles.popular}>
		
			<div className={styles.title}>
				<h2 className="font-semibold text-xl">Free To Watch</h2>

				<Tabs value={timeWindow} onValueChange={(value) => setTimeWindow(value as FreeTab)} >
					<TabsList className="bg-transparent">
					<TabsTrigger value="movie" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">Movies</TabsTrigger>
					<TabsTrigger value="tv" className="data-[state=active]:bg-[#04203c] data-[state=active]:text-white">Tv</TabsTrigger>
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