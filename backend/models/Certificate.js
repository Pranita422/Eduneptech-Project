const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String, // e.g., 'PROBLEM_SOLVER_BASIC', 'STREAK_MASTER'
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
});

// Ensure a user gets only one cert of a type
CertificateSchema.index({ userId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Certificate", CertificateSchema);
