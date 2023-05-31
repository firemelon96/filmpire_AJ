import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
// import App from './components/App';
import Root from './components/Root';
import Actors from './components/Actors/Actors';
import Movies from './components/Movies/Movies';
import MovieInformation from './components/MovieInformation/MovieInformation';
import { Provider } from 'react-redux';
import store from './App/store';
import ErrorPage from './components/ErrorPage';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Movies />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/actors/:id' element={<Actors />} />
        <Route path='/movie/:id' element={<MovieInformation />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
