import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Cards, SignUpSteps } from 'components/Auth/Signup';
import Appbar from 'components/Appbar';

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
  const [mentor, setMentor] = useState<boolean | null>(null);

  const handleCardClick = (type: 'mentor' | 'mentee') => {
    setMentor(type === 'mentor');
  };

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
        {mentor === null ? (
          <Cards onClick={handleCardClick} />
        ) : (
          <SignUpSteps onCancel={() => setMentor(null)} mentor={mentor} />
        )}
      </Container>
    </PageWrapper>
  );
};

export default Signup;
