import React from 'react'
import styles from 'app/home/sections/Home.module.css'
import TrailerSkeleton from './TrailerSkeleton'

export const CarouselTrailerSkeleton = () => {

  const skeletons = Array.from({ length: 12 })

  return (
    <div className={styles.moviecontainer}>
        {skeletons.map((_, index) => (
        <TrailerSkeleton key={index} />
      ))}
    </div>
  )
}
