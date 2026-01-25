const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy",
        index: true
    },
    description: {
        type: String,
        required: true
    },
    examples: [{
        input: String,
        output: String,
        explanation: String
    }],
    constraints: [String],
    tags: [String],
    testCases: [{
        input: String,
        expectedOutput: String,
        isPublic: {
            type: Boolean,
            default: false
        }
    }],
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Problem", problemSchema);
