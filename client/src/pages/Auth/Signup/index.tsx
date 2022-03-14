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
  const [mentor, setMentor] = useState(false);

  const handleCardClick = (type: 'mentor' | 'mentee') => {
    if (type === 'mentee') {
      // Send Req to complete-signup to complete signup for mentee
      // Redirect to Search Page
      console.log('Mentee');
    } else {
      // Display Additional Forms
      setMentor(true);
    }
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
        {!mentor && <Cards onClick={handleCardClick} />}
        {mentor && <SignUpSteps onCancel={() => setMentor(false)} />}
      </Container>
    </PageWrapper>
  );
};

export default Signup;
