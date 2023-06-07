import React from 'react';
import { Typography, CardMedia, Box, Card, CardContent } from '@mui/material';
import { NavLink } from 'react-router-dom';

function FeaturedMovie({ movie }) {
  return (
    <Box
      component={NavLink}
      to={`/movie/${movie.id}`}
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
      }}
    >
      <Card
        sx={{
          width: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <CardMedia
          component='img'
          height='140'
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.575)',
            backgroundBlendMode: 'darken',
          }}
        />
        <Box padding='20px'>
          <CardContent
            sx={{
              color: '#fff',
              width: {
                md: '40%',
                sm: '100%',
                position: 'relative',
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography variant='h5' gutterBottom>
              {movie?.title}
            </Typography>
            <Typography variant='body2'>{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
