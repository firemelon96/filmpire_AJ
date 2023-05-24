import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './components/App';
import Root from './components/Root';
import Actors from './components/Actors/Actors';
import Movies from './components/Movies/Movies';
import MovieInformation from './components/MovieInformation/MovieInformation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<App />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/actors' element={<Actors />} />
      <Route path='/movie-information' element={<MovieInformation />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
