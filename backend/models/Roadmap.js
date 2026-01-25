const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    resources: [
        {
            label: String,
            url: String,
        },
    ],
});

const RoadmapSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String, // e.g., "Development", "Computer Science"
        required: true,
    },
    description: {
        type: String,
    },
    steps: [StepSchema], // Ordered steps for the roadmap
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
