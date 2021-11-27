import React from 'react';
import Appbar from 'components/Appbar';
import Grid from '@mui/material/Grid';
import Particles from 'components/Particles';
import Hero from 'components/Hero';
import { styled } from '@mui/material/styles';

const PageOneWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  position: 'relative',
});

const Landing = () => (
  <>
    <PageOneWrapper>
      <Grid container direction="column" wrap="nowrap" sx={{ height: '100%' }}>
        <Grid item>
          <Appbar />
        </Grid>
        <Grid item sx={{ display: 'flex', flexGrow: 1 }}>
          <Hero />
        </Grid>
        <Particles />
      </Grid>
    </PageOneWrapper>
  </>
);

export default Landing;
