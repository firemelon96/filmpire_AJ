import React from 'react';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

function Movies() {
  const { data } = useGetMoviesQuery();
  return <MovieList movies={data} />;
}

export default Movies;
