import React from 'react'
import styles from "./Moviecard.module.css" 
import Image from 'next/image'

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const Moviecard = ({id, title, poster_path, release_date}: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className={styles.moviecard}>
        <Image 
        src={imageUrl} 
        alt={`Pôster do filme ${title}`} 
        width={150} 
        height={225} 
        />
        <div className={styles.container}>
          <h3 className="font-bold">{title}</h3>
          <h4 className="text-sm">{release_date}</h4>
        </div>
    </div>
  )
}

export default Moviecard