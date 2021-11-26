import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from 'pages/Landing';
import Prototype from './prototype';
import UserPage from 'pages/UserPage';
import SearchPage from 'pages/SearchPage';
import Loader from 'components/Loader';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'utils/hooks/theme';

const VideoCall = lazy(() => import('pages/VideoCall'));

const App = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={getTheme('dark')}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/prototype" element={<Prototype />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </ThemeProvider>

      <Routes>
        <Route path="/room" element={<VideoCall />} />
        <Route path="/room/:id" element={<VideoCall />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
