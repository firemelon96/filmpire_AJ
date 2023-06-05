import { Grid } from '@mui/material';
import React from 'react';
import Movie from '../Movie/Movie';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {movies?.results?.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
