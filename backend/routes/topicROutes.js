const express = require("express");
const router = express.Router();
const { getTopics, markTopicComplete } = require("../controllers/topicController");

router.get("/topics", getTopics);
router.post("/topics/complete", markTopicComplete);

module.exports = router;
