const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: String,
        enum: ["user", "bot"],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    context: {
        type: Object,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
