//user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  resetToken: String,
  resetTokenExpiry: Date,

  // Google OAuth (Legacy)
  googleId: { type: String, unique: true, sparse: true },
  picture: String,

  // Firebase Auth
  firebaseUid: { type: String, unique: true, sparse: true },

  // Streak System (LeetCode Style)
  streak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null }, // Still used for "visits" if needed
  lastSolvedDate: { type: Date, default: null }, // Track actual problem completion
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
  ],

  // Paid Features
  isPremium: { type: Boolean, default: false },
  premiumSince: { type: Date },
  premiumExpiresAt: { type: Date, default: null }, // 30-day subscription expiry

  // Paid Features
  unlockedCategories: {
    type: [String], // Array of category names e.g., ["Quantitative", "Advanced Java"]
    default: []
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: "light" }
  },
  paymentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment"
    }
  ]
});

// Virtual property to check if premium is currently active
userSchema.virtual('isPremiumActive').get(function () {
  if (!this.isPremium) return false;
  if (!this.premiumExpiresAt) return true; // Legacy premium users (no expiry set)
  return new Date() < this.premiumExpiresAt;
});

// Include virtuals when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);
