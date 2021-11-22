import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from 'pages/Landing';
import Prototype from './prototype';
import UserPage from 'pages/UserPage';
import SearchPage from 'pages/SearchPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/prototype" element={<Prototype />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  </Router>
);

export default App;
