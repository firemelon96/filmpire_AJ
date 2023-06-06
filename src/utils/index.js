import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem('request_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.href}`;
    }
  } catch (error) {
    console.log(`Sorry, your token could not be created ${error}`);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });

      if (!session_id) return;

      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (error) {
      console.log('💥💥⛔ create session error ', error);
    }
  }
};
