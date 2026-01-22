//Mcq.js
const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
    framework: {
        type: String,
        default: "NEP"
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        enum: ["FY", "SY", "TY"]
    },
    subject: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true }
    },
    correctAnswer: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D"]
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    }
}, { timestamps: true });

module.exports = mongoose.model("Mcq", mcqSchema);
