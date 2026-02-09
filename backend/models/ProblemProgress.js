const mongoose = require("mongoose");

const problemProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Problem",
        index: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    lastSolvedAt: {
        type: Date,
        default: Date.now
    }
});

// Unique index to ensure one progress record per user/problem
problemProgressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model("ProblemProgress", problemProgressSchema);
