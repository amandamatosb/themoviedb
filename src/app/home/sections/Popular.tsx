import React from 'react'
import styles from './Home.module.css'

export const Popular = () => {
  return (
    <section className= {styles.popular}>
        <h2 className="font-semibold text-xl">What's Popular</h2>
        <h2 className="font-semibold text-xl mt-8">Free to Watch</h2>
    </section>
  )
}
