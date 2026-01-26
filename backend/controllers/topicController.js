const Topic = require("../models/Topic");
const streakController = require("./streakController");
const User = require("../models/User"); // Ensure we have User model if needed, or rely on streakController returning it

exports.markTopicComplete = async (req, res) => {
  try {
    const { topicId, userId } = req.body;

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    // Check if already completed
    const isAlreadyCompleted = topic.completedBy.includes(userId);

    if (!isAlreadyCompleted) {
      topic.completedBy.push(userId);
      await topic.save();
    }

    // Update Streak (always update streak for activity)
    const { user } = await streakController.checkAndUpdateStreak(userId, `Completed topic: ${topic.topic}`);

    if (user && !isAlreadyCompleted) {
      const lang = topic.language ? topic.language.toLowerCase() : null;
      if (lang && user.progress && user.progress[lang] !== undefined) {
        user.progress[lang] += 1;
        await user.save();
      }
    }

    return res.json({ message: "Topic marked as complete", topicId, isNewCompletion: !isAlreadyCompleted });

  } catch (error) {
    console.error("Error marking topic complete:", error);
    res.status(500).json({ message: "Error marking topic complete" });
  }
};

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

