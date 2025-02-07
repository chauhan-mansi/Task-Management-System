import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Home from "./components/pages/Home.jsx";
import ProjectDetails from "./components/pages/ProjectDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
