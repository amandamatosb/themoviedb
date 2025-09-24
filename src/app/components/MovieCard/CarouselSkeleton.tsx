import React from 'react'
import styles from 'app/home/sections/Home.module.css'
import MovieSkeleton from './MovieSkeleton'

export const CarouselSkeleton = () => {

  const skeletons = Array.from({ length: 12 })

  return (
    <div className={styles.moviecontainer}>
        {skeletons.map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  )
}
