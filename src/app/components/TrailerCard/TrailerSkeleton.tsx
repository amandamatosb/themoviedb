import React from 'react'
import styles from "./Trailer.module.css"

const TrailerSkeleton = () => {
  return (
    <div className={styles.moviecard}>
        <div className={styles.containerimg_trailer}></div>
        <div className={styles.containertext_trailer}></div>
        <div className={styles.containertext_trailer}></div>
    </div> 
  )
}

export default TrailerSkeleton