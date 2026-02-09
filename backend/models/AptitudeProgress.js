const mongoose = require("mongoose");

const AptitudeProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AptitudeQuestion",
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    lastSolvedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can have only one progress record per question
AptitudeProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model("AptitudeProgress", AptitudeProgressSchema);
