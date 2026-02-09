const express = require("express");
const router = express.Router();
const { getQuestions, getCategories, submitResult } = require("../controllers/aptitudeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/questions", getQuestions);
router.get("/categories", getCategories);
router.post("/submit", authMiddleware, submitResult);

module.exports = router;
