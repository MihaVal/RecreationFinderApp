import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Go to Login" : "Go to Register"}
      </button>
      {showRegister ? <RegisterPage /> : <LoginPage />}
    </div>
  );
}

export default App;
