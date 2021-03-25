import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useGenres } from './useGenres';

interface Movies {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesProviderPros {
  children: ReactNode
}

interface MoviesContextData {
  movies: Movies[];
}

const MoviesContext = createContext({} as MoviesContextData);


export function MoviesProvider({ children }: MoviesProviderPros){
  const { selectedGenreId } = useGenres();
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    api.get<Movies[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);


  return (
    <MoviesContext.Provider value={{ movies }}>
      { children }
    </MoviesContext.Provider>
  )
}


export function useMovies() {
  const context = useContext(MoviesContext);

  return context;
}







