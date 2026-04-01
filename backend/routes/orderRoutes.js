const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  markAsPaid,
  markAsDelivered,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// USER ROUTES
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// ADMIN ROUTES
router.get("/", protect, admin, getAllOrders);
router.put("/:id/pay", protect, admin, markAsPaid);
router.put("/:id/deliver", protect, admin, markAsDelivered);

module.exports = router;