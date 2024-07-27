import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import DonutChart from "./DonutChart";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "https://via.placeholder.com/150",
  });
  const [minScore, setMinScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);
  const [courses, setCourses] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [con, setCon] = useState({
    text: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const settingcon = (e) => {
    setCon({ ...con, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("user");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        if (parsedProfile) {
          setProfile(parsedProfile);
          const { email } = parsedProfile;
          if (email) {
            const userScores =
              JSON.parse(localStorage.getItem(`scores_${email}`)) || [];
            if (userScores.length > 0) {
              setMinScore(Math.min(...userScores));
              setMaxScore(Math.max(...userScores));
              setScores(userScores);
            }

            const userCourses =
              JSON.parse(localStorage.getItem(`courses_${email}`)) || [];
            setCourses(userCourses);

            const userFlashcard = localStorage.getItem(`flashcard_${email}`);
            if (userFlashcard) {
              setCon({ text: userFlashcard });
            }
          }
        }
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSave = () => {
    if (profile.email) {
      localStorage.setItem(`flashcard_${profile.email}`, con.text);
    }
    setIsEditing(false);
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
      <div
        className="bg-white p-8 rounded-lg shadow-xl"
        style={{ width: "80vw", height: "80vh" }}
      >
        <img
          src={profile.image}
          alt={`${profile.firstName} ${profile.lastName}'s Profile`}
          className="w-32 h-32 rounded-full border-4 border-emerald-500 mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800">
          {profile.firstName} {profile.lastName}
        </h1>
        <p>{profile.email}</p>
        <div className="flex flex-col">
          <Link to="/editprofile">
            <button className="rounded-md border-black border-2 mt-4 ml-4">
              Edit Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 w-28 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Log Out
          </button>
        </div>

        <div className="mt-4 absolute right-1/4">
          <h2 className="text-xl font-semibold">Enrolled Courses</h2>
          {courses.length > 0 ? (
            <ul className="mt-2">
              {courses.map((course, index) => (
                <li key={index} className="mt-1">
                  {course.name}: {course.completion}% completed
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses enrolled.</p>
          )}
        </div>
        <div className="mt-4 absolute top-24 left-[33%]">
          <h2 className="text-xl font-semibold">Scores Chart</h2>
          {scores.length > 0 ? (
            <DonutChart scores={scores} />
          ) : (
            <p>No scores available.</p>
          )}
        </div>
        <h2 className="mt-4 absolute left-[34%] top-[55%]">
          Min Score: {minScore !== null ? minScore : "N/A"}
        </h2>
        <h2 className="absolute left-[44%] top-[57%]">
          Max Score: {maxScore !== null ? maxScore : "N/A"}
        </h2>

        <textarea
          autoComplete="off"
          type="text"
          className="h-60 w-80 absolute right-72 top-32 border-red-700 border-2 resize-none"
          name="text"
          value={con.text}
          placeholder="Your Msg:"
          onChange={settingcon}
          id="desc"
          cols="30"
          rows="10"
          readOnly={!isEditing}
        />

        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-36 right-44 border-2"
        >
          Edit Flashcard
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="absolute top-44 right-52 w-11 border-2"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
