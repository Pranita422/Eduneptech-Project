const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

const { getTopics } = require("../controllers/topicController");

//router.get("/topics", getTopics);
router.get("/topics", async (req, res) => {
  const { language, search } = req.query;

  let query = {};
  if (language) query.language = language;

  if (search) {
    query.topic = { $regex: search, $options: "i" };
  }

  try {
    const topics = await Topic.find(query).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Error fetching topics" });
  }
});



module.exports = router;
