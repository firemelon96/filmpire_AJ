import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetRecommendationQuery,
} from '../../services/TMDB';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import MovieList from '../MovieList/MovieList';
import { ArrowBack } from '@mui/icons-material';
import PaginationBtn from '../Pagination/Pagination';

function Actors() {
  const { id } = useParams();
  const { data, isLoading } = useGetActorQuery(id);
  const [page, setPage] = useState(1);
  const { data: moviesByActors } = useGetMoviesByActorIdQuery({ id, page });
  console.log(moviesByActors);

  if (isLoading) {
    <Box display='flex' justifyContent='center'>
      <CircularProgress size='8rem' />
    </Box>;
  }

  return (
    <Grid container spacing={3} columns={12}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          margin: '10px 0 !important',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flexDirection: { sm: 'column' },
          flexWrap: { sm: 'wrap' },
        }}
      >
        <Box
          component='img'
          sx={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64,64,70)',
            width: '80%',
            flexDirection: { sm: 'column' },
            flexWrap: { sm: 'wrap' },
          }}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant='h3' align='left' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant='h6' gutterBottom>
          {data?.biography}
        </Typography>
        <Box
          item
          sx={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => history.goBack()}
            color='primary'
          >
            BACK
          </Button>
        </Box>
      </Grid>
      <Grid item marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          Movies
        </Typography>
        {moviesByActors ? (
          <>
            <MovieList movies={moviesByActors} numberOfMovies={12} />
            <Box display='flex' justifyContent='center'>
              <PaginationBtn
                currentPage={page}
                setPage={setPage}
                totalPage={moviesByActors.total_pages}
              />
            </Box>
          </>
        ) : (
          <Box>Sorry nothing is found</Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Actors;
