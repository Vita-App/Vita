import React from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { SignUpSteps } from 'components/Auth/Signup';
import Appbar from 'components/Appbar';
import { authState } from 'store';
import { Navigate } from 'react-router-dom';

const PageWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  position: 'relative',
});

const Signup: React.FC = () => {
  const auth = useRecoilValue(authState);

  if (auth.user?.signup_completed) {
    return <Navigate to="/" />;
  }

  return (
    <PageWrapper>
      <Appbar />
      <Container
        sx={{
          my: 5,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SignUpSteps />
      </Container>
    </PageWrapper>
  );
};

export default Signup;
