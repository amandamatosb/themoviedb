import React from 'react'
import styles from './Home.module.css'
import Link from 'next/link'

const Join = () => {
  return (
    <section className= {styles.join}>
        <div className={styles.container}>
          <h2 className="font-bold text-2xl mb-5">Join Today</h2>
          <p className="mb-5">Get access to maintain your own custom personal lists, 
          track what you've seen and search and filter for what to watch next—regardless if it's in theatres, 
          on TV or available on popular streaming services like Disney Plus, Netflix, Amazon Prime Video, 
          Claro video, and Looke.</p>
          <h3>Sign Up</h3>
        </div>
        <div className="mt-13 text-gray-300">
          <ul className="list-disc">
            <li>Enjoy TMDB ad free</li>
            <li>Maintain a personal watchlist</li>
            <li>Filter by your subscribed streaming services and find something to watch</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </ul>
        </div>
      </section> 
  )
}

export default Join