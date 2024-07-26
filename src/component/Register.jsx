import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdOutlineArrowBack } from "react-icons/md"
import { Link } from "react-router-dom"
const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    const { firstName, lastName, username, email, password } = user

    if (!firstName || !lastName || !username || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    localStorage.setItem("user", JSON.stringify(user))
    console.log("User registered:", user)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-gradient-to-r from-green-400 to-blue-500">
      <Link to="/">
        <button className="absolute text-white z-40 top-10 left-11 p-2 bg-black rounded-full shadow-md hover:bg-gray-800 transition duration-300">
          <MdOutlineArrowBack size={26} />
        </button>
      </Link>
      <div className=" bg-opacity-50 p-8 rounded shadow-xl w-[30%] backdrop-blur-md backdrop-filter">
        <h2 className="text-3xl mb-4 text-center">Register</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-xl">
              First Name:
            </label>
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
            <label htmlFor="lastName" className="block text-gray-700 text-xl">
              Last Name:
            </label>
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
            <label htmlFor="username" className="block text-gray-700 text-xl">
              Username:
            </label>
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
            <label htmlFor="email" className="block text-gray-700 text-xl">
              Email:
            </label>
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
            <label htmlFor="password" className="block text-gray-700 text-xl">
              Password:
            </label>
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
          <h2 className="text-xl">Already Registered?</h2>
          <button
            className="text-red-700 text-xl "
            onClick={() => navigate("/login")}
          >
            login
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
