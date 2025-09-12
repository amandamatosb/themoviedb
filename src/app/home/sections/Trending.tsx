import React from 'react'
import styles from './Home.module.css'
import Moviecard from 'app/components/MovieCard/Moviecard'

const Trending = () => {
  return (
    <section className= {styles.trending}>
        <h2 className="font-semibold text-xl">Trending</h2>
        <div className= {styles.moviecontainer}>
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <Moviecard />
          <div className={styles.fade}></div>
        </div>
    </section>  
  )
}

export default Trending