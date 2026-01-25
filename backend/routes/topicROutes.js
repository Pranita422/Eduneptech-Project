const express = require("express");
const router = express.Router();
const { getTopics } = require("../controllers/topicController");

router.get("/topics", getTopics);

module.exports = router;
