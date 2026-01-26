const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming this exists

router.get("/dashboard", authMiddleware, progressController.getDashboardData);

module.exports = router;
