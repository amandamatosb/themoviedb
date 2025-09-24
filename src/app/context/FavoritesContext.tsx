'use client'

import {createContext, useState, useEffect, useContext, ReactNode} from 'react'
import { Movie } from 'app/types'

interface FavoritesType {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (movieid: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesType | undefined>(undefined);

export default function FavoriteProvider({children} : {children : ReactNode}) {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        
        const stored = localStorage.getItem("favorites");
        if(stored) {
            setFavorites(JSON.parse(stored));
        }
    
    }, []);

    useEffect(() => {
        
        localStorage.setItem("favorites", JSON.stringify(favorites));
    
    }, [favorites]);

    const isFavorite = (movieid: number) => {
        return favorites.some((fav) => fav.id === movieid);
    }

    const toggleFavorite = (movie : Movie) => {
        if(isFavorite(movie.id)){
            setFavorites(favorites.filter((fav) => fav.id !== movie.id));
        }else{
            setFavorites([...favorites, movie]);
        }
    }
    
    console.log(favorites);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    );

}
