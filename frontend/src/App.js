import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import "./styles/App.css";

import Home from "./Home";
import Driver from "./Driver";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";   // ✅ ADD THIS

function App() {
  return (
    <Router>
      <div className="app-container">

        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* ✅ ADD THIS */}
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;