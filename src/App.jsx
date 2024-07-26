import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <div className="bg-red-600">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
