import React from 'react';
import { Grid, Typography, styled } from '@mui/material';
import Searchbox from './Searchbox';

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #f5f5f5;
  padding: 2rem;
  .MuiTypography-root {
    /* background: -webkit-linear-gradient(#fffcfc8b, #f5f5f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    font-size: 120px;
    font-family: 'inter';
    font-weight: 800;
    opacity: 0.9;
  }
`;

const Hero = () => (
  <Grid container direction="row" sx={{ height: '100%' }}>
    <StyledGrid item xs={12} lg={6}>
      <Typography variant="h1">Search.</Typography>
      <Typography>Schedule.</Typography>
      <Typography>Meet.</Typography>
    </StyledGrid>
    <Grid
      item
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
      }}>
      <Searchbox />
    </Grid>
  </Grid>
);

export default Hero;
