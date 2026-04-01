const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// Normal protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Admin only route
router.get("/admin", protect, admin, (req, res) => {
  res.send("Welcome Admin");
});

module.exports = router;