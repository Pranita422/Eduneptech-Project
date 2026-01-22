/*const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  framework: String,
  course: String,
  language: String,
  slug: String,
  title: String,
  content: String,
  order: Number,
  isPublished: { type: Boolean, default: true }
});

module.exports = mongoose.model("Topic", topicSchema);*/

/*const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  language: String,
  topic: String,
  order: Number
});

module.exports = mongoose.model("Topic", topicSchema);*/

const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  language: { type: String, required: true }, // C, C++, Java, Python
  topic: { type: String, required: true },    // Loops, Arrays
  theory: { type: String },                   // Full explanation (optional as many docs lack it)
  //order: Number

completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Topic", topicSchema);


