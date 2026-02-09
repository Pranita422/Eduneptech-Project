const mongoose = require("mongoose");

const AptitudeQuestionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Quantitative", "Logical Reasoning", "Verbal Ability", "Data Structures"],
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, "{PATH} must have exactly 4 options"],
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        default: "",
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model("AptitudeQuestion", AptitudeQuestionSchema);
