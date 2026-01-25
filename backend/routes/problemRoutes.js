const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

// Route to get all problems based on language/difficulty
router.get("/", problemController.getProblems);

// Route to get a specific problem by ID
router.get("/:id", problemController.getProblemById);

module.exports = router;
