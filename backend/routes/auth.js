const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "bus_tracker_secret_key_123";

// REGISTER Endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, busId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      busId: role === "driver" ? busId || "BUS101" : null
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN Endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, busId: user.busId },
      SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      busId: user.busId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;