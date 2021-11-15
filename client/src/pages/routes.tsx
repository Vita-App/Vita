import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from 'pages/Landing';
import Prototype from './prototype';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Prototype />} />
    </Routes>
  </Router>
);

export default App;
