import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from 'pages/Landing';
import AuthPage from 'pages/Auth';
import UserPage from 'pages/UserPage';
import SearchPage from 'pages/SearchPage';
import Dashboard from 'pages/Dashboard';
import Loader from 'components/Loader';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'utils/hooks/theme';
import usePageTracking from 'utils/hooks/use-page-tracking';
import Signup from 'pages/Auth/Signup';

const VideoCall = lazy(() => import('pages/VideoCall'));

const App = () => {
  usePageTracking();
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={getTheme('dark')}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search/" element={<SearchPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration-form" element={<Signup />} />
        </Routes>
      </ThemeProvider>
      <Routes>
        <Route path="/room" element={<VideoCall />} />
        <Route path="/room/:id" element={<VideoCall />} />
      </Routes>
    </Suspense>
  );
};

export default App;
