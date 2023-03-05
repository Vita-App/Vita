import React, { Suspense, useEffect, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
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
import ForgotPassword from 'pages/ForgotPassword';
import Banner from 'components/Banner';
import useMetaData from 'hooks/useMetaData';
import Bookings from './Dashboard/Booking';
import Settings from './Dashboard/Settings';
import WaitListPage from './Waitlist';
import DevLogin from './Auth/DevLogin';
import Error404 from './Error404/Error404';

const Landing = lazy(() => import('pages/Landing'));
const EmailVerification = lazy(() => import('pages/EmailVerification'));
const Signup = lazy(() => import('pages/Auth/Signup'));
const Dashboard = lazy(() => import('pages/Dashboard'));

const App = () => {
  const { pathname } = useLocation();
  const { loading, sendRequest } = useHttp(true);
  const setAuthState = useSetRecoilState(authState);
  usePageTracking();
  useMetaData();

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
          if (pathname === '/registration-form') return;
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
      <Banner />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute redirectTo="/dashboard" inverse />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        {import.meta.env.DEV && (
          <Route path="/dev-login" element={<DevLogin />} />
        )}
        <Route path="/search/" element={<SearchPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route element={<ProtectedRoute isRegisteredGuard />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Bookings />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute inverse redirectTo="/" />}>
          <Route path="/email-verification" element={<EmailVerification />} />
        </Route>
        <Route path="/registration-form" element={<Signup />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/join-waitlist" element={<WaitListPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default App;
