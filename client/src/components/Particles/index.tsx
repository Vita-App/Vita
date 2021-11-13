import React from 'react';
import ParticlesJS from 'react-tsparticles';
import config from './config';
import { styled } from '@mui/material/styles';

// Position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 0;
//     pointer-events: none;
//     overflow: hidden;
//     max-width: 97vw;
//     max-height: 97vh;

const Particles = () => (
  <ParticlesJS
    id="tsparticles"
    options={{
      ...config,
    }}
  />
);

export default Particles;
