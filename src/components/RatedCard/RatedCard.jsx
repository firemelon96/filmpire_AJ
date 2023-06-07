import React from 'react';
import { Typography, Grid } from '@mui/material';

// import Movie from '../Movie/Movie';
import MovieCard from '../Movie/MovieCard';

function RatedCard({ title, data }) {
  return (
    <>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data?.results.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} i={i} />
        ))}
      </Grid>
    </>
  );
}

export default RatedCard;
