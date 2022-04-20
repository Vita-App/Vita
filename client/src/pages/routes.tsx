import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import useHttp from 'hooks/useHttp';
import { SERVER_URL } from 'config.keys';
import { useSetRecoilState } from 'recoil';
import { authState } from 'store';
import axios from 'axios';

const VideoCall = lazy(() => import('pages/VideoCall'));

const App = () => {
  const navigate = useNavigate();
  const { loading, sendRequest } = useHttp();
  const setAuthState = useSetRecoilState(authState);
  usePageTracking();

  useEffect(() => {
    sendRequest(
      async () => {
        const { data } = await axios.get(`${SERVER_URL}/api/auth`, {
          withCredentials: true,
        });
        return data;
      },
      (data: any) => {
        setAuthState(data);
        if (data.isLoggedIn && !data.user.signup_completed) {
          navigate('/registration-form');
        }
      },
    );
  }, []);

  if (loading) return <Loader />;

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
