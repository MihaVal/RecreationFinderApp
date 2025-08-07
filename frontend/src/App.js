import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import CreateEventPage from "./Pages/CreateEventPage";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="App">
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("create")}>Create Event</button>

      {page === "login" && <LoginPage />}
      {page === "register" && <RegisterPage />}
      {page === "home" && <HomePage />}
      {page === "create" && <CreateEventPage />}
    </div>
  );
}

export default App;
