import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="App">
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("home")}>Home</button>

      {page === "login" && <LoginPage />}
      {page === "register" && <RegisterPage />}
      {page === "home" && <HomePage />}
    </div>
  );
}

export default App;
