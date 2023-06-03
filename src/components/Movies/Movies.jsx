import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { useSelector } from 'react-redux';
import PaginationBtn from '../Pagination/Pagination';

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

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
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
