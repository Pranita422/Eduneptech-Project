const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

// Route to submit code for evaluation
router.post("/", submissionController.submitCode);

// Route to get submission history
router.get("/", submissionController.getSubmissions);

module.exports = router;
