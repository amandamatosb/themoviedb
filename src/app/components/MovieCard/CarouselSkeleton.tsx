import React from 'react'
import styles from 'app/home/sections/Home.module.css'
import MovieSkeleton from './MovieSkeleton'

export const CarouselSkeleton = () => {
  return (
    <div className={styles.moviecontainer}>
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
    </div>
  )
}
