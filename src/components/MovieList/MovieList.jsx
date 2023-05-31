import { Grid } from '@mui/material';
import React from 'react';
import Movie from '../Movie/Movie';

function MovieList({ movies, numberOfMovies }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {movies?.results?.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
