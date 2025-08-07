import React, { useState } from "react";
import Login from "../Components/Login";

function LoginPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email) => {
    setLoggedInUser(email);
  };

  return (
    <div>
      {loggedInUser ? (
        <p>Welcome, {loggedInUser}!</p>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default LoginPage;
