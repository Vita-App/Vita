import React from 'react';
import './App.css';
import Routes from 'pages/routes';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'utils/hooks/theme';

const App = () => {
  const theme = getTheme('dark');
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
