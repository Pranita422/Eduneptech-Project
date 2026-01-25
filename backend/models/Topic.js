const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  language: { type: String, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true }, // Changed back to content to match Atlas screenshot
  order: { type: Number, default: 0 },
  slug: { type: String },
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}); // Removed explicit collection: "Tutorial" to restore default "topics" collection

module.exports = mongoose.model("Topic", topicSchema);
