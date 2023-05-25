import { CssBaseline } from '@mui/material';
import React from 'react';
// import SearchAppBar from './NavBar/SearchAppBar';
import ResponsiveDrawer from './Drawer/Drawer';

function Root() {
  return (
    <>
      <CssBaseline />
      {/* <nav>
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
      </nav> */}
      <ResponsiveDrawer />
      {/* 
      <Outlet /> */}
    </>
  );
}

export default Root;
