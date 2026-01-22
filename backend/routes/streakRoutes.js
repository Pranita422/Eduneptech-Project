const express = require("express");
const router = express.Router();
const { updateStreak, getStreak } = require("../controllers/streakController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming this exists, if not we'll create/mock or just check req.user

// Apply auth middleware if available, otherwise we might need to rely on passed IDs (less secure but ok for MVP)
// Just in case, let's see if we can find the middleware. 
// For now, defining routes.

router.get("/", authMiddleware, getStreak); // GET /api/streak
router.post("/update", authMiddleware, updateStreak); // POST /api/streak/update

module.exports = router;
