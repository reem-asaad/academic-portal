const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, description, startDate, endDate, teacher } = req.body;
    const course = new Course({
      name,
      description,
      startDate,
      endDate,
      teacher,
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const { teacher } = req.query;
    let courses;

    if (teacher) {
      courses = await Course.find({ teacher });
    } else {
      courses = await Course.find();
    }

    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", verifyToken, async (req, res) => {
  try {
    await Course.deleteMany({});
    res.status(200).json({ message: "All courses deleted successfully" });
  } catch (error) {
    console.error("Error deleting courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
