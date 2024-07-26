import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    image: 'https://via.placeholder.com/150'
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('user')); 
    if (storedProfile) {
      setProfile(storedProfile);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center p-4">
      <Link to="/test">
        <button 
          aria-label="Go Back"
          className="absolute text-white z-40 top-10 left-11 p-2 bg-black rounded-full shadow-md hover:bg-gray-800 transition duration-300"
        >
          <MdOutlineArrowBack size={26} />
        </button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center w-1/2 h-1/2 max-w-md">
        <img
          src={profile.image}
          alt={`${profile.firstName} ${profile.lastName}'s Profile`}
          className="w-32 h-32 rounded-full border-4 border-emerald-500 mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-gray-600">@{profile.username}</p>
        <p>{profile.email}</p>
        <Link to="/editprofile">
          <button className="rounded-md border-black border-2 mt-4">Edit Profile</button>
        </Link>
        <h2 className="mt-4">min: 90%</h2>
        <h2>max: 30%</h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
