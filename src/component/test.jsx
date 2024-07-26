import React from "react";
import { GiRamProfile } from "react-icons/gi";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";

const Test = () => {
  // Check if user is authenticated
  const isAuthenticated = Boolean(localStorage.getItem('user'));

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen relative">
      <span className="absolute top-7 right-10 flex items-center justify-center bg-slate-600 w-12 h-12 rounded-full">
        {isAuthenticated ? (
          <Link to="/profile">
            <button className="flex items-center justify-center">
              <GiRamProfile size={35} className="text-white" />
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="flex items-center justify-center">
              <AiOutlineLogin size={35} className="text-white" />
            </button>
          </Link>
        )}
      </span>
      <div className="h-[35rem] w-[35rem] bg-slate-600 flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-4xl pt-6">Level Test</h1>
        <h2></h2>
        <h3></h3>
      </div>
    </div>
  );
};

export default Test;
