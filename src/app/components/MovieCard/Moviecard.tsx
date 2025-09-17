import React from 'react'
import styles from "./Moviecard.module.css" 
import Image from 'next/image'
import {format, parseISO} from 'date-fns'
import { enUS } from 'date-fns/locale'

const formatDate = (dateString: string | undefined) => {
  if(!dateString) return '';

  const data = parseISO(dateString);

  return format(data, 'MMM dd, yyyy', {locale: enUS});
}

interface MovieCardProps {
  id: number;
  poster_path: string;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;

  media_type: 'movie' | 'tv' | 'person';
}

const Moviecard = ({id, title, poster_path, release_date}: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className={styles.moviecard}>
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
    </div>
  )
}

export default Moviecard