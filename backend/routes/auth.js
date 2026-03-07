import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const newUser = new User({ fullName, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password!" });

    res.status(200).json({ message: "Login successful!", role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
