//user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  resetToken: String,
  resetTokenExpiry: Date,

  // Streak System
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null },
  streakHistory: [{ date: Date, activity: String }], // Optional for future charts

  // Learning Progress
  progress: {
    html: { type: Number, default: 0 }, // Percentage or points
    css: { type: Number, default: 0 },
    javascript: { type: Number, default: 0 },
    totalSolved: { type: Number, default: 0 }
  },

  achievements: [
    {
      title: String,
      description: String,
      dateEarned: { type: Date, default: Date.now },
      icon: String // Optional: URL or icon name
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
