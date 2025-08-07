// src/pages/RegisterPage.js
import React, { useState } from "react";
import Register from "../Components/Register";

function RegisterPage() {
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleRegister = (user) => {
    setRegisteredUser(user);
  };

  return (
    <div>
      {registeredUser ? (
        <p>
          Welcome, {registeredUser.name} {registeredUser.surname}! Registration
          successful.
        </p>
      ) : (
        <Register onRegister={handleRegister} />
      )}
    </div>
  );
}

export default RegisterPage;
