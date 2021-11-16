import React from 'react';
import logo from 'logo.svg';
import Appbar from 'components/Appbar';
import Grid from '@mui/material/Grid';
import Particles from 'components/Particles';
import Pagination from 'components/Pagination';
import Hero from 'components/Hero';
import { styled } from '@mui/material/styles';

const FillerComponent = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        Learn React
      </a>
    </header>
  </div>
);

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
    <FillerComponent />
    <Pagination />
  </>
);

export default Landing;
