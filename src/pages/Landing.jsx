

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-6xl mb-6 text-white">Welcome to the Website</h1>
      <div className="flex gap-4 absolute top-4 right-8 ">
        <Link to="/login">
          <button className=" text-black py-2 px-4 h-12 w-28 text-xl border-2 rounded-md border-emerald-200 text-md">
            Login
          </button>
        </Link>
      </div>
      <Link to="/test">
        <button className="h-12 w-28 border-solid absolute top-[55%] right-[47%] border-2 rounded-md border-emerald-200 text-xl">
          Try demo
        </button>
      </Link>
    </div>
  );
};

export default Landing;
