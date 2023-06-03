import React, { useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/currentGenreOrCategory';

function SearchInput() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={handleKeypress}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Search>
  );
}

export default SearchInput;
