import React from 'react';
import { Stack, Typography, styled } from '@mui/material';

const StyledStack = styled(Stack)`
  padding: 2rem;
  color: #f5f5f5;
  .MuiTypography-root {
    font-size: 90px;
    font-family: 'inter';
    font-weight: 800;
    opacity: 0.9;
  }
`;

const Hero = () => {
  const x = 1;
  return (
    <StyledStack>
      <Typography variant="h1">Search.</Typography>
      <Typography>Schedule.</Typography>
      <Typography>Meet.</Typography>
    </StyledStack>
  );
};

export default Hero;
