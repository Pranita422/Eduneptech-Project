const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.post("/order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

// Mock Payment Route (For Development/Testing)
const { simulatePayment } = require("../controllers/mockPaymentController");
router.post("/mock-verify", authMiddleware, simulatePayment);


module.exports = router;
