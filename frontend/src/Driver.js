import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/App.css";

const socket = io("https://bus-management-7bxs.onrender.com");
function Driver() {
  const [status, setStatus] = useState("Connecting...");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const busId = localStorage.getItem("busId") || "BUS101"; // ✅ ADDED

    // ✅ Token & Role Check
    if (!token || role !== "driver") {
      alert("Access Denied! Please login as Driver.");
      window.location.href = "/login";
      return;
    }

    console.log(`🚍 Driver ${name} (${busId}) logged in successfully`);

    // Start sending location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          busId: busId, // ✅ dynamic
          driverName: name || "Driver",
          timestamp: new Date().toISOString()
        };

        socket.emit("sendLocation", locationData);

        if (!isSending) {
          setIsSending(true);
          setStatus("✅ Sending Live Location");
        }
      },
      (error) => {
        console.error("Location Error:", error);
        setStatus("❌ Location access denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.disconnect();
    };
  }, [isSending]);

  return (
    <div className="content">
      <div className="card">
        <h2>🚍 Driver Dashboard</h2>

        <p><strong>Driver Name:</strong> {localStorage.getItem("name") || "Unknown"}</p>
        <p><strong>Bus ID:</strong> {localStorage.getItem("busId") || "BUS101"}</p> {/* ✅ ADDED */}

        <div style={{
          margin: "20px 0",
          padding: "15px",
          borderRadius: "12px",
          background: isSending ? "#052e16" : "#1e2937",
          color: isSending ? "#4ade80" : "#94a3b8",
          fontWeight: "500"
        }}>
          Status: {status}
        </div>

        <p>Your location is being shared in real-time with the tracking map.</p>

        <small style={{ color: "#64748b" }}>
          📍 Make sure GPS is enabled on your device
        </small>
      </div>
    </div>
  );
}

export default Driver;