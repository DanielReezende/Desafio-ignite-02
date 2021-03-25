import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresContextData {
  genres: Genre[];
  selectedGenre: Genre;
  selectedGenreId: number;
  handleClickButtonSelectGenre: (id: number) => void;
}


interface GenreProviderPros {
  children: ReactNode
}

const GenresContext = createContext({} as GenresContextData);

export function GenresProvider({ children } : GenreProviderPros) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId])

  function handleClickButtonSelectGenre(id: number) {
    setSelectedGenreId(id);
  }

  return(
    <GenresContext.Provider value={{ genres, selectedGenreId, selectedGenre, handleClickButtonSelectGenre }}>
      { children }
    </GenresContext.Provider>
  )
}


export function useGenres() {
  const context = useContext(GenresContext);

  return context;
}