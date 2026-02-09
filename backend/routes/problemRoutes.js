const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

const protect = require("../middleware/authMiddleware");

// Route to get all problems based on language/difficulty (Protected to fetch user progress)
router.get("/", protect, problemController.getProblems);

// Route to get a specific problem by ID
router.get("/:id", problemController.getProblemById);

module.exports = router;
