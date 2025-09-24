import React from 'react'
import styles from "./MovieCard.module.css" 

const MovieSkeleton = () => {
  return (
    <div className={styles.moviecard}>
        <div className={styles.containerimg}></div>
        <div className={styles.container_text}></div>
        <div className={styles.container_text}></div>
    </div> 
  )
}

export default MovieSkeleton