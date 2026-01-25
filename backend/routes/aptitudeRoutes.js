const express = require("express");
const router = express.Router();
const { getQuestions, getCategories } = require("../controllers/aptitudeController");

router.get("/questions", getQuestions);
router.get("/categories", getCategories);

module.exports = router;
