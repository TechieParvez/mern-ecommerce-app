const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Add to cart
router.post("/", protect, addToCart);

// Get cart
router.get("/", protect, getCart);

// Remove item
router.delete("/:productId", protect, removeFromCart);

module.exports = router;