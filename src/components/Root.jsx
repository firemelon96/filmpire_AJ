import { CssBaseline } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <CssBaseline />
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/movies'}>Movies</NavLink>
          </li>
          <li>
            <NavLink to={'/actors'}>Actors</NavLink>
          </li>
          <li>
            <NavLink to={'/movie-information'}>Movie Information</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Root;
