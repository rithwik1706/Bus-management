const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/busTracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

let buses = {}; // store all buses

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendLocation", (data) => {
    // Save/update bus location
    buses[data.busId] = data;

    // Send ALL buses to frontend
    io.emit("receiveLocation", Object.values(buses));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
// Test Route
app.get("/", (req, res) => {
  res.send("Bus Tracker Backend Running");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});