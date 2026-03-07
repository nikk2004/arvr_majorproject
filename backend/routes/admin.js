import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET ALL STUDENTS
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    console.error("Fetch students error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE STUDENT
router.delete("/students/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;