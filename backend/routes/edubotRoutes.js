const express = require("express");
const router = express.Router();
const edubotController = require("../controllers/edubotController");
const authMiddleware = require("../middleware/authMiddleware");

// All edubot routes are protected
router.get("/ping", (req, res) => res.json({ message: "EduBot is online!", timestamp: new Date() }));
router.post("/chat", authMiddleware, edubotController.processChat);
router.get("/history", authMiddleware, edubotController.getChatHistory);
router.delete("/history", authMiddleware, edubotController.clearChatHistory);

module.exports = router;
