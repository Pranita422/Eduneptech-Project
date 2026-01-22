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
  streakHistory: [{ date: Date, activity: String }] // Optional for future charts
});

module.exports = mongoose.model("User", userSchema);
