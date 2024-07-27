import React, { useState, useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";

const Test = () => {
  const [profile, setProfile] = useState({
    image: "https://via.placeholder.com/150",
  });
  const [score, setScore] = useState(0);

  const [questions] = useState([
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: "Harper Lee" },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  const userEmail = isAuthenticated ? JSON.parse(localStorage.getItem("user")).email : null;

  useEffect(() => {
    const storedProfile = localStorage.getItem("user");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        if (parsedProfile && parsedProfile.image) {
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  const handleOptionClick = (option) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = option;
      return newAnswers;
    });
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handleSubmit = () => {
    if (selectedAnswers.every((answer) => answer !== null)) {
      const finalScore = calculateScore();
      setScore(finalScore);

      if (userEmail) {
        const userScores = JSON.parse(localStorage.getItem(`scores_${userEmail}`)) || [];
        userScores.push(finalScore);
        localStorage.setItem(`scores_${userEmail}`, JSON.stringify(userScores));
        console.log("Scores saved to localStorage:", userScores); 
      }

      setShowResults(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      if (selectedAnswers[index] === question.answer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen relative p-4">
      <span className="absolute top-7 right-10 flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
        {isAuthenticated ? (
          <Link to="/profile">
            <button className="flex items-center justify-center">
              <img src={profile.image} alt="Profile" className="w-10 h-10 rounded-full" />
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
      <div className="h-[35rem] w-[38rem] backdrop-blur-md backdrop-filter flex flex-col items-center justify-center absolute top-24 left-2/5 transform -translate-x-1/2 rounded-lg shadow-lg p-8">
        <h1 className="text-white text-center text-5xl font-bold pt-6">Level Test</h1>
        <div className="mt-8 w-full">
          <h2 className="text-white text-center text-2xl font-semibold mb-6">{questions[currentQuestionIndex].question}</h2>
          <p className="text-white text-center mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="mt-4 flex flex-col items-center">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`text-white border-2 p-3 rounded-md mb-2 w-full max-w-xs hover:bg-blue-600 transition duration-300 ${selectedAnswers[currentQuestionIndex] === option ? "bg-blue-700" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex gap-14 mt-6 justify-center">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Prev
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        showResults && (
          <div className="text-white text-center mt-8 border-3 h-60 w-64 border-red-950 flex flex-col absolute top-48 right-1/4 backdrop-blur-md shadow-lg gap-y-4 backdrop-filter">
            <h2 className="text-3xl mt-4">Test Results</h2>
            <p className="text-xl mt-4">You scored {score} out of {questions.length}</p>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300">Course</button>
            </Link>
          </div>
        )
      ) : (
        showResults && (
          <div className="text-white text-center mt-4">
            <h2 className="text-3xl">Please log in to see your results.</h2>
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300">Login</button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Test;
