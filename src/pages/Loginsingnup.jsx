import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../css/loginsign.css';

const Loginsignup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 w-full">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Loginsignup;
