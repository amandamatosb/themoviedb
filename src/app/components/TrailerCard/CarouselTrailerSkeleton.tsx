import React from 'react'
import styles from 'app/home/sections/Home.module.css'
import TrailerSkeleton from './TrailerSkeleton'

export const CarouselTrailerSkeleton = () => {

  return (
    <div className={styles.moviecontainer}>
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
        <TrailerSkeleton />
    </div>
  )
}
