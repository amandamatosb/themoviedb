import { useContext } from "react";
import { FavoritesContext } from 'app/context/FavoritesContext';

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (context === undefined) {
        throw new Error('Não deu certo')
    }

    return context;

}