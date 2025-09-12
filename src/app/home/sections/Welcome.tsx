import React from 'react'
import styles from './Home.module.css'

const Welcome = () => {
  return (
    <section className= {styles.welcome}>
        <h1 className="font-bold text-4xl" >Welcome.</h1>
        <h2 className="font-semibold text-2xl">Millions of movies, TV shows and people to discover. Explore now.</h2>
    </section>  
  )
}

export default Welcome