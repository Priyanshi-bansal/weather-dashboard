import React from 'react';
import "./globals.css";
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className="text-2xl font-bold text-center p-4 bg-[#e8bfbf]">Weather Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default Home;
