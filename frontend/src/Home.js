import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/App.css";

const socket = io("https://bus-management-7bxs.onrender.com");
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

function Home() {
  const [buses, setBuses] = useState([]);   // ✅ MULTIPLE buses
  const [map, setMap] = useState(null);

  useEffect(() => {
    socket.on("receiveLocation", (data) => {
      setBuses(data);   // ✅ array of buses
    });

    return () => socket.off("receiveLocation");
  }, []);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [map]);

  return (
    <div className="content">
      <h2 className="page-title">Live Bus Tracking 🚌</h2>

      <div className="map-container">
        <MapContainer
          center={buses.length ? [buses[0].lat, buses[0].lng] : [17.385, 78.486]}
          zoom={15}
          style={{ height: "82vh", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* ✅ MULTIPLE MARKERS */}
          {buses.map((bus, index) => (
            <Marker key={index} position={[bus.lat, bus.lng]} icon={busIcon}>
              <Popup>
                <b>{bus.busId}</b><br />
                Driver: {bus.driverName}
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>
    </div>
  );
}

export default Home;