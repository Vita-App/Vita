import React from 'react';
import './App.css';
import Routes from 'pages/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PRODUCTION } from 'config.keys';
import { RecoilRoot } from 'recoil';
import { DebugObserver } from 'store';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          {!PRODUCTION && (
            <>
              <DebugObserver />
              <ReactQueryDevtools initialIsOpen />
            </>
          )}
          <Routes />
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
