import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Appbar from 'components/Appbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import { Button, Container, Stack, Typography } from '@mui/material';
import useHttp from 'hooks/useHttp';
import { SERVER_URL } from 'config.keys';
import { UserType } from 'types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'components/common';

const PageWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  position: 'relative',
});

const DevLogin: React.FC = () => {
  const { loading, sendRequest, error } = useHttp();
  const [auth, setAuthState] = useRecoilState(authState);
  const navigate = useNavigate();

  if (auth.user?.signup_completed) {
    return <Navigate to="/" />;
  }

  const devLogin = async (mentor: boolean) => {
    sendRequest(
      async () => {
        const { data } = await axios.get<UserType>(
          `${SERVER_URL}/api/dev-login`,
          {
            params: {
              mentor_login: mentor,
            },
            withCredentials: true,
          },
        );

        return data;
      },
      (data: any) => {
        setAuthState(data);
        toast.success('Logged in successfully as dev users');
        navigate('/');
      },
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <PageWrapper>
      <Appbar />
      <Stack
        color="white"
        spacing={2}
        alignItems="center"
        flex={1}
        justifyContent="center">
        <Typography variant="h4" component="h1">
          Dev Login
        </Typography>
        <Typography variant="body1" component="p">
          This is a dev login page. You can login as a mentor or mentee without
          the hassale of setting bunch of environment variables for actual login
          process. You can still go to the actual login page by clicking{' '}
          <Link to="/auth" sx={{ color: 'Highlight' }}>
            here
          </Link>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => devLogin(false)}>
            Login as Mentee
          </Button>
          <Button variant="contained" onClick={() => devLogin(true)}>
            Login as Mentor
          </Button>
        </Stack>
        {loading && <div>Logging you in...</div>}
      </Stack>
    </PageWrapper>
  );
};

export default DevLogin;
