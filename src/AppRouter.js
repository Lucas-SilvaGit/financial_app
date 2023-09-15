import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const AppRouter = () => {
  return (
    <Routes>
      <div>
        <Route path="/" element={<Home />} />
        <Route path="/" exact component={AccountList} />
      </div>
    </Routes>
  );
};

export default AppRouter;
