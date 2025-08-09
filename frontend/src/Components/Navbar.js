import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../Context/AppContext";

export default function Navbar() {
  const { user, setUser } = useApp();
  const nav = useNavigate();
  const loc = useLocation();

  const logout = () => {
    setUser(null);
    if (loc.pathname !== "/home") nav("/home");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #333",
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/create">Create</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && (
        <span style={{ marginLeft: "auto" }}>
          👤 {user.name} {user.surname} ({user.email})
        </span>
      )}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
