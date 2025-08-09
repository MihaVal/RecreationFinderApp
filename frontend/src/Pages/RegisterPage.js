import React, { useState } from "react";
import Register from "../Components/Register";
import { useApp } from "../Context/AppContext";

export default function RegisterPage() {
  const { user, setUser } = useApp();
  const [msg, setMsg] = useState("");

  const handleRegister = (u) => {
    setUser(u); // pretend backend created the user
    setMsg("Registration successful!");
  };

  return (
    <div>
      {user ? (
        <p>
          Welcome, {user.name} {user.surname}! {msg}
        </p>
      ) : (
        <Register onRegister={handleRegister} />
      )}
    </div>
  );
}
