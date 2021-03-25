import { GenresProvider } from './hooks/useGenres';
import { MoviesProvider } from './hooks/useMovies';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';




export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenresProvider>
        <MoviesProvider>
          <SideBar />
          <Content />
        </MoviesProvider>
      </GenresProvider>
    </div>
  )
}