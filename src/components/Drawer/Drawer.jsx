import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListSubheader,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { AccountCircle } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import genreIcons from '../../assets/genres';
import SearchInput from '../Search/Search';

import { useGetGenresQuery } from '../../services/TMDB';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { createSessionId, fetchToken, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/auth';

const drawerWidth = 240;

const movieCategory = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();
  console.log(user);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token, sessionIdFromLocalStorage]);

  const drawer = (
    <div>
      <Toolbar>
        <LocalMoviesIcon sx={{ mr: 1 }} />
        <Typography
          variant='h5'
          noWrap
          component={NavLink}
          textAlign='center'
          to='/'
          sx={{ textDecoration: 'none' }}
        >
          FILMPIRE
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {movieCategory.map(({ label, value }) => (
          <ListItem
            key={value}
            disablePadding
            onClick={() => dispatch(selectGenreOrCategory(value))}
          >
            <ListItemButton>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {isLoading ? (
        <Box display='flex' marginTop={3} justifyContent='center'>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          <ListSubheader>Genres</ListSubheader>
          {data.genres.map(({ name, id }) => (
            <ListItem
              key={id}
              disablePadding
              onClick={() => dispatch(selectGenreOrCategory(id))}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Responsive drawer
          </Typography>
          <SearchInput />
          {/* {console.log(!isAuthenticated)} */}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Button
                color='inherit'
                component={NavLink}
                to={`/profile/${user.id}`}
                onClick={() => {}}
              >
                MY MOVIES
              </Button>
            </Box>
          )}
          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
