//mcqRoutes.js
const express = require("express");
const router = express.Router();
const { getMcqs, seedMcqs } = require("../controllers/mcqController");

router.get("/", getMcqs);
router.post("/seed", seedMcqs); // Added for convenience during testing

module.exports = router;
