//streakCOntroller.js
const User = require("../models/User");

// Helper: Get UTC start of day (midnight 00:00:00 UTC)
// This ensures consistent date storage and comparison across timezones
const getUTCStartOfDay = (date) => {
    const d = new Date(date);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
};

// Helper: Calculate day difference using UTC dates
// Returns positive number if date2 is after date1, negative if before, 0 if same day
const getDayDifference = (date1, date2) => {
    const utcDate1 = getUTCStartOfDay(date1);
    const utcDate2 = getUTCStartOfDay(date2);

    const diffTime = utcDate2.getTime() - utcDate1.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

// Helper to check and update streak
exports.checkAndUpdateStreak = async (userId, activity = "General Activity") => {
    const user = await User.findById(userId);
    if (!user) return null;

    const today = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    let message = "Activity tracked";

    user.lastActiveDate = today;

    // Log activity in history
    user.streakHistory.push({ date: today, activity });

    await user.save();
    return { streak: user.streak, message, user };
};

// New: Problem-Based Streak Logic (LeetCode Style)
exports.updateProblemStreak = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return null;

    // Get today's date normalized to UTC midnight
    const todayNormalized = getUTCStartOfDay(new Date());
    const lastSolved = user.lastSolvedDate ? new Date(user.lastSolvedDate) : null;
    let message = "Streak updated";

    if (!lastSolved) {
        // First problem solved ever
        user.streak = 1;
        user.lastSolvedDate = todayNormalized;  // Store normalized UTC date
        message = "First problem solved! Streak started! 🔥";
    } else {
        const diff = getDayDifference(lastSolved, todayNormalized);

        if (diff === 0) {
            // Same day - no change to streak
            message = "Problem solved! Streak maintained for today. ✅";
        } else if (diff === 1) {
            // Exactly one day later - increment streak
            user.streak += 1;
            user.lastSolvedDate = todayNormalized;  // Store normalized UTC date
            message = "Streak incremented! Keep it up! 🔥";
        } else if (diff > 1) {
            // Gap > 1 day - reset to 1
            user.streak = 1;
            user.lastSolvedDate = todayNormalized;  // Store normalized UTC date
            message = "Streak reset to 1. Consistency is key! ⏳";
        } else {
            // diff < 0 (future date in DB - shouldn't happen, but handle gracefully)
            // This could occur if server time goes backward or data corruption
            message = "Date anomaly detected. Streak maintained.";
            console.warn(`[Streak] Negative day difference detected for user ${userId}: ${diff} days`);
        }
    }

    // Update longest streak
    if (user.streak > (user.longestStreak || 0)) {
        user.longestStreak = user.streak;
    }

    await user.save();
    return { streak: user.streak, longestStreak: user.longestStreak, message };
};

// Check and Update Streak Logic (Endpoint)
exports.updateStreak = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const activity = req.body?.activity || "General Activity";
        const result = await exports.checkAndUpdateStreak(userId, activity);

        if (!result) return res.status(404).json({ message: "User not found" });

        return res.json({ streak: result.streak, message: result.message });

    } catch (error) {
        console.error("Streak Error:", error);
        res.status(500).json({ message: "Server error updating streak" });
    }
};

exports.getStreak = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            streak: user.streak,
            longestStreak: user.longestStreak || 0,
            lastActiveDate: user.lastActiveDate,
            lastSolvedDate: user.lastSolvedDate
        });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching streak" });
    }
};
