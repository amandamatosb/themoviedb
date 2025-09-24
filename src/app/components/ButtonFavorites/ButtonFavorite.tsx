'use client'

import {useState, useEffect} from 'react'
import { Movie } from 'app/types'
import Image from 'next/image'
import { useFavorites } from 'app/hooks/useFavorites'

export default function ButtonFavorite({movie} : {movie: Movie}) {
    
    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(movie.id);

    return (
        <button onClick={() => toggleFavorite(movie)} className='cursor-pointer'> 
            {favorite ? <Image src="/heart_red.svg" width={30} height={30} alt="Favorite"/>
                        : <Image src="/heart.svg" width={30} height={30} alt="Favorite"/>
            }
        </button>
    );

}
