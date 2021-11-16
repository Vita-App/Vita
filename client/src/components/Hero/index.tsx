import React from 'react';
import { Grid, Typography, styled } from '@mui/material';
import Searchbox from './Searchbox';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  color: '#f5f5f5',
  paddingLeft: '2rem',

  '& .MuiTypography-root': {
    diplay: 'inline-flex',
    [theme.breakpoints.up('xs')]: {
      fontSize: '15vw',
      flexWrap: 'nowrap',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '11vw',
      flexWrap: 'nowrap',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '9vw',
      flexWrap: 'nowrap',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '8vw',
      flexWrap: 'nowrap',
    },
    fontFamily: 'inter',
    fontWeight: '800',
    opacity: '0.9',
  },
}));

const Hero = () => (
  <Grid container item direction="row">
    <StyledGrid item sm={12} lg={6} style={{ width: '100%' }}>
      <Typography>Search.</Typography>
      <Typography>Schedule.</Typography>
      <Typography>Meet.</Typography>
    </StyledGrid>
    <Grid
      container
      item
      sm={12}
      lg={6}
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
