/*const Topic = require("../models/Topic");

// 👇 YAHI PASTE KARNA HAI
exports.getTopics = async (req, res) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }

    const topics = await Topic.find({ language }).sort({ order: 1 });

    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Server error" });
  }
};*/
const Topic = require("../models/Topic");

exports.getTopics = async (req, res) => {
  try {
    const { language } = req.query;
    console.log("LANGUAGE RECEIVED:", language); // debug

    const topics = await Topic.find({ language }).sort({ order: 1 });

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics" });
  }
};

