import React from 'react';
import { Link } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';

const Home = () => {
  return (
    <div className="container-lg">
      <h1> Dashboard </h1>
      <DashboardOverview/>
    </div>
  );
};

export default Home;
