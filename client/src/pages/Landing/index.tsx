import React from 'react';
import logo from 'logo.svg';
import Appbar from 'components/Appbar';
import Box from '@mui/material/Box';
import Particles from 'components/Particles';

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
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

const Landing = () => (
  <Box
    sx={{
      backgroundColor: 'transparent',
      height: '100vw',
      width: '100%',
      position: 'relative',
    }}
  >
    <Appbar />
    <FillerComponent />
    <Particles />
  </Box>
);

export default Landing;
