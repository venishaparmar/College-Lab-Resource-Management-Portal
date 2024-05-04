const express = require("express");
const { body, validationResult } = require("express-validator");
const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");

const router = express.Router();

// POST endpoint to add faculty data
router.post(
  "/",
  [
    // Validate request body
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request body
    const { email, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new faculty instance with hashed password
      const faculty = new Faculty({ email, password: hashedPassword });

      // Save faculty data to the database
      await faculty.save();

      // Send success response
      res.status(201).json({
        success: true,
        message: "Faculty data added successfully",
      });
    } catch (error) {
      console.error(error);
      // Send error response
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the faculty by email
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, faculty.password);

    if (isPasswordValid) {
      // Send success response
      res.status(200).json({ success: true, faculty });
    } else {
      // Send error response for invalid password
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
