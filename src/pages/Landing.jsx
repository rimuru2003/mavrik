// Landing.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="h-10 w-28 border-solid absolute top-4 right-8 border-4 border-emerald-200"
        onClick={() => navigate('/login')}
      >
        login/Signup
      </button>
      <h1 className="absolute top-[30%] right-[26%] text-7xl">Welcome to the website</h1>
      <button className="h-10 w-24 border-solid absolute top-[50%] right-[50%] border-4 border-emerald-200">
        try demo
      </button>
    </div>
  );
};

export default Landing;
