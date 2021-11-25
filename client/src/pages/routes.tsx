import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from 'pages/Landing';
import Prototype from './prototype';
import UserPage from 'pages/UserPage';
import SearchPage from 'pages/SearchPage';
import Loader from 'components/Loader';
import VideoCall from 'pages/VideoCall';
// const VideoCall = lazy(() => import('pages/VideoCall'));
const App = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<VideoCall />} />
        <Route path="/meet" element={<Landing />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
