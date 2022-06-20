import React, { Suspense, useEffect, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Route, Routes } from 'react-router-dom';
import AuthPage from 'pages/Auth';
import UserPage from 'pages/UserPage';
import SearchPage from 'pages/SearchPage';
import Loader from 'components/Loader';
import usePageTracking from 'utils/hooks/use-page-tracking';
import useHttp from 'hooks/useHttp';
import { SERVER_URL } from 'config.keys';
import { useSetRecoilState } from 'recoil';
import { authState } from 'store';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import ProtectedRoute from 'service/ProtectedRoute';
import ForgotPassword from './ForgotPassword';

const Landing = lazy(() => import('pages/Landing'));
const EmailVerification = lazy(() => import('pages/EmailVerification'));
const Signup = lazy(() => import('pages/Auth/Signup'));
const Dashboard = lazy(() => import('pages/Dashboard'));

const App = () => {
  const { loading, sendRequest } = useHttp(true);
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
          toast.info(
            () => (
              <div>
                <p>
                  Your registration is incomplete. Complete your{' '}
                  <Link to="/registration-form">Registration</Link> now?
                </p>
              </div>
            ),
            {
              autoClose: false,
            },
          );
        }
      },
    );
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer position="bottom-left" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute redirectTo="/dashboard" inverse />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route path="/search/" element={<SearchPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route element={<ProtectedRoute redirectTo="/auth" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute inverse redirectTo="/" />}>
          <Route path="/email-verification" element={<EmailVerification />} />
        </Route>
        <Route path="/registration-form" element={<Signup />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </Suspense>
  );
};

export default App;
