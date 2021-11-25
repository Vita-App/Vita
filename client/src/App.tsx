import React from 'react';
import './App.css';
import Routes from 'pages/routes';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'utils/hooks/theme';
import { RecoilRoot } from 'recoil';
import { DebugObserver } from 'atoms';
const App = () => {
  const theme = getTheme('dark');
  return (
    <RecoilRoot>
      <DebugObserver />
      <Routes />
      {/* <ThemeProvider theme={theme}>
      </ThemeProvider> */}
    </RecoilRoot>
  );
};

export default App;
