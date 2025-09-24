'use client'

import ButtonFavorite from 'app/components/ButtonFavorites/ButtonFavorite'
import { Movie } from 'app/types'
import styles from './Favorites.module.scss'
import { useFavorites } from 'app/hooks/useFavorites'
import Image from 'next/image'
import formatDate from 'app/utils'

export default function Favorite() {
    
    const { favorites } = useFavorites();
    
    return (
        <div className={styles.fav}>

          <div className={styles.title}>
            <h1 className="font-semibold text-xl">Favorites</h1>
          </div>

          {favorites.length > 0 &&
            (
              favorites.map((movie: Movie) => (
                  <div key={movie.id} className={styles.info}>
                    <div>
                      <Image 
                            src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title || movie.name}`} 
                            width={150} 
                            height={225} 
                            className={styles.image}
                            />
                    </div>
                    <div className={styles.text}>
                      <h2>{`${movie.title || movie.name}`}</h2>
                      <h3>{formatDate(movie.first_air_date || movie.release_date)}</h3>
                      <h4>{`${movie.tagline}`}</h4>
            
                      <ButtonFavorite movie={movie} />
                    </div>
                  </div>
                ))

              )}

        </div> 
    );

}