import { Stack, Pagination } from '@mui/material';
import React from 'react';

function PaginationBtn({ currentPage, setPage, totalPage }) {
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        page={currentPage}
        variant='outlined'
        shape='rounded'
        onChange={handleChange}
      />
    </Stack>
  );
}

export default PaginationBtn;
