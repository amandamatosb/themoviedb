import React from 'react'
import styles from './Home.module.css'
import Moviecard from 'app/components/MovieCard/Moviecard'

export const Popular = () => {
  return (
    <section className= {styles.popular}>
        <h2 className="font-semibold text-xl">What's Popular</h2>
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
        <h2 className="font-semibold text-xl mt-8">Free to Watch</h2>
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
