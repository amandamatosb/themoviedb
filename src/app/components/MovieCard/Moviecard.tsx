import React from 'react'
import styles from "./MovieCard.module.css" 
import Image from 'next/image'
import Link from 'next/link'
import formatDate from 'app/utils'

interface MovieCardProps {
  id: number;
  poster_path: string;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;

  media_type: 'movie' | 'tv' | 'person';
}

const Moviecard = ({id, title, poster_path, release_date, media_type}: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className={styles.moviecard}>
      <Link href={`/detail/${media_type}/${id}`}>
        <Image 
        src={imageUrl} 
        alt={`${title}`} 
        width={150} 
        height={225} 
        />
        <div className={styles.container}>
          <h3 className="font-bold">{title}</h3>
          <h4 className="text-sm">{formatDate(release_date)}</h4>
        </div>
      </Link>
    </div>
  )
}

export default Moviecard