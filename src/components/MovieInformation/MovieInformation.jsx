import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from '@mui/material';
import {
  Movie,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
} from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieList from '../MovieList/MovieList';
import axios from 'axios';
import { userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function MovieInformation() {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const colorMode = useContext(ColorModeContext);

  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data, isLoading, isError } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationQuery({
    list: '/recommendations',
    movie_id: id,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addtoFav = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isFavorited,
      }
    );

    setIsFavorited((prev) => !prev);
  };
  const addtoWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isWatchlisted,
      }
    );
    setIsWatchlisted((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box display='flex' justifyContent='center'>
        <NavLink to='/'>Something has gone wrong</NavLink>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} columns={12}>
      <Grid
        item
        xs={12}
        md={4}
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
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction='column' xs={12} md={8}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          alignItems='center'
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: { sm: 'column' },
            flexWrap: { sm: 'wrap' },
          }}
        >
          <Box display='flex'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography sx={{ ml: '5px' }} gutterBottom>
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {data?.genres?.map((genre) => (
            <Button
              component={NavLink}
              to='/'
              key={genre.name}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { sm: '0.5rem 1rem' },
              }}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <Box
                component='img'
                src={genreIcons[genre.name.toLowerCase()]}
                height={30}
                sx={{
                  marginRight: '10px',
                  filter: colorMode.mode === 'dark' && 'invert(1)',
                }}
              />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Button>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom sx={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography sx={{ marginBottom: '10px' }}>{data?.overview}</Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={NavLink}
                      to={`/actors/${character.id}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <Box
                        component='img'
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                        sx={{
                          width: '100%',
                          maxWidth: '7em',
                          height: '8em',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                      <Typography>{character.name}</Typography>
                      <Typography>
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid
          container
          sx={{
            marginTop: '2rem',
            justifyContent: { md: 'space-between', xs: 'center' },
          }}
        >
          <Grid item lg={6} sm={12}>
            <ButtonGroup size='small' variant='outlined'>
              <Button
                target='_blank'
                rel='noopener noreferrer'
                href={data?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target='_blank'
                rel='noopener noreferrer'
                href={`https://www.imdb.com/title/${data?.imdb_id}`}
                endIcon={<Movie />}
              >
                IMDB
              </Button>
              <Button
                onClick={() => setOpen(true)}
                href='#'
                endIcon={<Theaters />}
              >
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item lg={6} sm={12}>
            <ButtonGroup size='small' variant='outlined'>
              <Button
                onClick={addtoFav}
                endIcon={
                  isFavorited ? <Favorite /> : <FavoriteBorderOutlined />
                }
              >
                {isFavorited ? 'Unfavorite' : 'Favorite'}
              </Button>
              <Button
                onClick={addtoWatchlist}
                endIcon={isWatchlisted ? <Remove /> : <PlusOne />}
              >
                Watchlist
              </Button>
              <Button endIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                <Typography
                  color='inherit'
                  variant='subtitle2'
                  sx={{ textDecoration: 'none' }}
                >
                  Back
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry nothing is found</Box>
        )}
      </Grid>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {data?.videos?.results?.length > 0 && (
          <Box
            component='iframe'
            autoPlay
            title='Trailer'
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
            sx={{ width: '50%', height: '50%' }}
          />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInformation;
