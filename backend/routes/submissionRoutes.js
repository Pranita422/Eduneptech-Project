const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to submit code for evaluation
router.post("/", authMiddleware, submissionController.submitCode);

// Route to get submission history
router.get("/", authMiddleware, submissionController.getSubmissions);

module.exports = router;
