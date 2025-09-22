'use client'

import React, { use } from 'react'
import styles from './Home.module.css'
import {useState, useEffect} from 'react'
import Moviecard from 'app/components/MovieCard/Moviecard'
import { Movie } from 'app/types'
import { CarouselSkeleton } from 'app/components/MovieCard/CarouselSkeleton'

export default function FreeWatch(){

	const [timeWindow, setTimeWindow] = useState('movie');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

  	const type = timeWindow === 'tv' ? 'tv' : 'movie';


	useEffect(() => {
			
		const fetchFreeWatch = async () => {
			setLoading(true);
			setError(null);

			const url = `https://api.themoviedb.org/3/discover/${timeWindow}?include_adult=false&with_watch_monetization_types=free&primary_release_date.lte=2025-09-17&sort_by=vote_average.desc&vote_count.gte=1000`;
			const options = {
				method: 'GET',
				headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGMxYzFiZDU3MzY2NTgyNjNjMzc0MWFiZmY1NGJmNCIsIm5iZiI6MTc1NzUyNzg0Mi4wNTksInN1YiI6IjY4YzFiZjIyYjRiNDc0MDAwYzFmNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Ir2TNtVmhW7IZR00ChUh7Y_JeZoy7-V71jE61mLRio'
				}
			};

			try {
				const response = await fetch(url, options);
				if(!response.ok){
					throw new Error('Falha na resposta da API');
				}

				const data = await response.json();

				setMovies(data.results);
			}

			catch(err) {
				setError('Falha ao carregar.')
				console.error(err);
			}

			finally {
				setLoading(false);
			}

			}
		
		fetchFreeWatch();   



	}, [timeWindow]);

	if (error) return <div>{error}</div>;

	return (
		<section className={styles.popular}>
		
			<div className={styles.title}>
				<h2 className="font-semibold text-xl">Free To Watch</h2>
				<button onClick={() => setTimeWindow('movie')} className={timeWindow === 'movie' ? 'active' : ''}>
					/Movies/
				</button>
				<button onClick={() => setTimeWindow('tv')} className={timeWindow === 'tv' ? 'active' : ''}> 
					/Tv/
				</button>
			</div>

		{loading ? (<CarouselSkeleton />)

		: (
			<div className={styles.moviecontainer}>
				{movies.map((movie: Movie) => {

					return(
						<Moviecard
						key={movie.id}
						id={movie.id}
						title={movie.title || movie.name}
						poster_path={movie.poster_path}
						release_date={movie.release_date || movie.first_air_date}
						media_type={type}
						/>
					);

				})}

			</div>
		)}
		</section>
	);
}


