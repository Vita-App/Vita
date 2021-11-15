import React from 'react';
import logo from 'logo.svg';
import Appbar from 'components/Appbar';
import Box from '@mui/material/Box';
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

const PageOne = styled(Box)({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  position: 'relative',
});

const Landing = () => (
  <>
    <PageOne sx={{}}>
      <Appbar />
      <Hero />
      {/* <FillerComponent /> */}
      <Particles />
    </PageOne>
    <Pagination />
  </>
);

export default Landing;
