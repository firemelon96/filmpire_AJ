import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { useSelector } from 'react-redux';
import PaginationBtn from '../Pagination/Pagination';
import FeaturedMovie from '../FeatureMovie/FeaturedMovie';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Box display='flex' justifyContent='center'>
        <PaginationBtn
          currentPage={page}
          setPage={setPage}
          totalPage={data.total_pages}
        />
      </Box>
    </div>
  );
}

export default Movies;
