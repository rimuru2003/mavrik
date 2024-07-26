import React, { useState, useEffect } from "react"
import { AiOutlineLogin } from "react-icons/ai"
import { Link } from "react-router-dom"

const Test = () => {
  const [profile, setProfile] = useState({
    image: "https://via.placeholder.com/150",
  })

  const isAuthenticated = Boolean(localStorage.getItem("user"))

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("user"))
    if (storedProfile) {
      setProfile(storedProfile)
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen relative">
      <span className="absolute top-7 right-10 flex items-center justify-center w-12 h-12 rounded-full">
        {isAuthenticated ? (
          <Link to="/profile">
            <button className="flex items-center justify-center">
              <img
                src={profile.image}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
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
  )
}

export default Test
