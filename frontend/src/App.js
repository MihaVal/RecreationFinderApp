import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Navbar from "./Components/Navbar";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import CreateEventPage from "./Pages/CreateEventPage";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div style={{ padding: 16 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
