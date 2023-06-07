import React, { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import { useDispatch } from 'react-redux';
import {
  searchMovie,
  selectGenreOrCategory,
} from '../features/currentGenreOrCategory';
import { useNavigate } from 'react-router-dom';
<link
  href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  rel='stylesheet'
></link>;

function useAlanAi() {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: '7e180e4e0bc194cdcd82cf8ff7960acf2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory;
            navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        }

        if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        }

        if (command === 'login') {
          fetchToken();
        }

        if (command === 'logout') {
          localStorage.clear();
          navigate(0);
        }

        if (command === 'search') {
          navigate('/');
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
}

export default useAlanAi;
