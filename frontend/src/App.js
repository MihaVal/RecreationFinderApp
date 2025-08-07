import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import CreateEventPage from "./Pages/CreateEventPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>{" "}
          | <Link to="/home">Home</Link> |{" "}
          <Link to="/create">Create Event</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
