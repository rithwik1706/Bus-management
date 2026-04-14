import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css"; // reuse same style

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    busId: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
    setLoading(true);
    try {
     await axios.post("https://bus-management-7bxs.onrender.com/api/auth/register",  form);

      alert("✅ Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚌 BusTracker</h1>
        <h2>Create Account</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "driver" && (
          <input name="busId" placeholder="Bus ID (e.g., BUS101)" onChange={handleChange} />
        )}

        <button onClick={register} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Register;