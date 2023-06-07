import React, { useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCard from '../RatedCard/RatedCard';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const navigate = useNavigate();

  const { data: favoriteMovies, refetch: fetchFavoriteMovie } = useGetListQuery(
    {
      listName: 'favorite/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    }
  );
  const { data: watchlistMovies, refetch: fetchWatchlistMovie } =
    useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });

  useEffect(() => {
    fetchFavoriteMovie();
    fetchWatchlistMovie();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      {isAuthenticated ? (
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h4' gutterBottom>
            My Profile - {user.username}
          </Typography>
          <Button color='inherit' onClick={logout}>
            Logout &nbsp; <ExitToApp />
          </Button>
        </Box>
      ) : (
        navigate('/')
      )}
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant='h5'>
          Add favorite or watchlist some movies to see them here!
        </Typography>
      ) : (
        <>
          <Divider />
          <RatedCard title='Favorite Movies' data={favoriteMovies} />
          <Divider sx={{ marginTop: '15px' }} />
          <RatedCard title='Watchlist Movies' data={watchlistMovies} />
        </>
      )}
    </Box>
  );
}

export default Profile;
