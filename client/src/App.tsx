import React from 'react';
import './App.css';
import Routes from 'pages/routes';

import { RecoilRoot } from 'recoil';
import { DebugObserver } from 'atoms';
const App = () => (
  <RecoilRoot>
    <DebugObserver />
    <Routes />
  </RecoilRoot>
);

export default App;
