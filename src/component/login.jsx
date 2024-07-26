import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const Navigate = useNavigate();
  const notify = () => toast("Loged in sucessfully");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("User does not exist");
      return;
    }

    // Check if email and password match
    if (storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid email or password");
      return;
    }

    // Handle successful login logic here
    console.log("Login successful");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-gradient-to-r from-green-400 to-blue-500 ">
      <Link to="/">
        <button className="absolute text-white z-40 top-10 left-11 p-2 bg-black rounded-full shadow-md hover:bg-gray-800 transition duration-300">
          <MdOutlineArrowBack size={26} />
        </button>
      </Link>
      <div className=" p-8 rounded shadow-md w-80 backdrop-blur-md backdrop-filter">
        <h2 className="text-3xl mb-4 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-xl">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-xl">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-300"
            onClick={notify}
          >
            Submit
          </button>
        </form>
        <span className="flex justify-center gap-2">
          <h2 className="text-md">Not Registered?</h2>{" "}
          <Link to="/Register">
            <button className="text-red-700 text-md">Register </button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
