import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: ''
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('user')); 
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(profile)); 
    console.log('Updated Profile:', profile);
  };

  const triggerFileInput = () => {
    document.getElementById('image').click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-4">
      <Link to="/profile">
        <button className="absolute text-white z-40 top-10 left-11 p-2 bg-black rounded-full shadow-md hover:bg-gray-800 transition duration-300">
          <MdOutlineArrowBack size={26} />
        </button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your email"
            />
          </div>    
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-emerald-200"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Profile Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex justify-center">
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt="Profile"
                onClick={triggerFileInput}
                className="w-32 h-32 rounded-full border-4 border-emerald-500 cursor-pointer"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
