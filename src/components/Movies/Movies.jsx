import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { useSelector } from 'react-redux';
// import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

function Movies() {
  const page = 1;
  // const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  return <MovieList movies={data} />;
}

export default Movies;
