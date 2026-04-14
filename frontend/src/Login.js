import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      axios.post("https://bus-management-7bxs.onrender.com/api/auth/login",  {
        email,
        password
      });

      // ✅ Simple Token Storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name || "");
      localStorage.setItem("busId", res.data.busId || "");

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "driver") navigate("/driver");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚍 BusTracker</h1>
        <h2>Welcome Back</h2>
        <p>Real-time Bus Tracking System</p>

        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;