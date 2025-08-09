import React, { useState } from "react";
import Login from "../Components/Login";
import { useApp } from "../Context/AppContext";

export default function LoginPage() {
  const { user, setUser } = useApp();
  const [message, setMessage] = useState("");

  const handleLogin = (email) => {
    // mock user (replace with real API later)
    setUser({ email, name: "Demo", surname: "User" });
    setMessage("Logged in successfully.");
  };

  return (
    <div>
      {user ? (
        <p>
          Welcome, {user.name} {user.surname}!
        </p>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
