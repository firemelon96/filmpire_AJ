import React from 'react';
import {
  Grid,
  CardMedia,
  Rating,
  Card,
  CardActionArea,
  CardContent,
  Grow,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

function MovieCard({ movie, i }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ textAlign: 'center' }}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Card sx={{ maxWidth: 365, borderRadius: '20px' }}>
          <CardActionArea component={NavLink} to={`/movie/${movie.id}`}>
            <CardMedia
              component='img'
              height='340'
              sx={{ '&:hover': { transform: 'scale(1.05)' } }}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://www.fillmurray.com/200/300'
              }
              alt={movie.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                {movie.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </Grid>
  );
}

export default MovieCard;
