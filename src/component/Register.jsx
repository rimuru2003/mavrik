import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
const Navigate = useNavigate()
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { firstName, lastName, username, email, password } = user;

    // Basic validation
    if (!firstName || !lastName || !username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page or show success message
    console.log('User registered:', user);
  };

  console.log('User:', user);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your first name"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your last name"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <span className="flex justify-center gap-2">
          <h2>Already Registered?</h2>{" "}
          <button className='text-red-400' onClick={() => Navigate("/login")}>login </button>{" "}
        </span>
      </div>
    </div>
  );
};

export default Register;
