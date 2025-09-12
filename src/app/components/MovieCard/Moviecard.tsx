import React from 'react'
import styles from "./Moviecard.module.css" 

const Moviecard = () => {
  return (
    <div className={styles.moviecard}>
        <img src="https://placehold.co/150x225" alt="" className="w-full"/>
        <h3 className="font-bold">Título do Filme</h3>
        <h4 className="text-sm">Set 12, 2025</h4>
    </div>
  )
}

export default Moviecard