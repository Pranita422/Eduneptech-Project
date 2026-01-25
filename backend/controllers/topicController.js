const Topic = require("../models/Topic");

exports.getTopics = async (req, res) => {
  try {
    const { language, search } = req.query;

    let query = {};
    if (language) query.language = language;
    if (search) {
      query.topic = { $regex: search, $options: "i" };
    }

    const topics = await Topic.find(query).sort({ order: 1 });

    res.status(200).json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Error fetching topics" });
  }
};

