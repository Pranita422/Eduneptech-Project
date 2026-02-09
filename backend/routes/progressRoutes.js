const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming this exists
const { requireActivePremium } = require("../middleware/checkPremiumMiddleware");

router.get("/dashboard", authMiddleware, progressController.getDashboardData);
router.get("/elite", authMiddleware, requireActivePremium, progressController.getEliteAnalytics);

module.exports = router;
