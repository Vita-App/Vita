import React from 'react';
import ParticlesJS from 'react-tsparticles';
import config from './config';

const Particles = () => (
  <ParticlesJS
    id="tsparticles"
    options={{
      ...config,
    }}
  />
);

export default Particles;
