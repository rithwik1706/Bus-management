import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login"); // ✅ better than window.location
  };

  return (
    <nav className="nav">
      <h2 className="logo">🚌 BusTracker</h2>

      <div className="nav-links">
        <Link to="/" className="link">Home</Link>

        {role === "driver" && (
          <Link to="/driver" className="link">Driver</Link>
        )}

        {role === "admin" && (
          <Link to="/admin" className="link">Admin</Link>
        )}

        {!role && (
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/register" className="link">Register</Link>
          </>
        )}

        {role && (
          <button onClick={logout} className="link">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;