import React from 'react';
import { Grid, Grow, CardMedia, Rating, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
// import { experimentalStyled as styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function Movie({ movie, i }) {
  return (
    <Grid sx={{ textAlign: 'center' }} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <NavLink to={`/movie/${movie.id}`}>
          <CardMedia
            component='img'
            sx={{
              borderRadius: '20px',
              height: '400px',
              marginBottom: '10px',
              '&:hover': { transform: 'scale(1.05)' },
            }}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
            alt={movie.title}
          />
          <Typography
            variant='h5'
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </NavLink>
      </Grow>
    </Grid>
  );
}

export default Movie;
