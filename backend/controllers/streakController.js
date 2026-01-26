//streakCOntroller.js
const User = require("../models/User");

// Helper: Check Day Difference
const getDayDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Helper to check and update streak
exports.checkAndUpdateStreak = async (userId, activity = "General Activity") => {
    const user = await User.findById(userId);
    if (!user) return null;

    const today = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    let message = "Streak updated";
    let streakIncremented = false;
    let diff = 0;

    if (!lastActive) {
        // First time activity
        user.streak = 1;
        user.lastActiveDate = today;
        streakIncremented = true;
    } else {
        diff = getDayDifference(lastActive, today);

        if (diff === 0) {
            // Same day, do nothing (or just update timestamp)
            message = "Already active today";
        } else if (diff === 1) {
            // Consecutive day, increment
            user.streak += 1;
            user.lastActiveDate = today;
            message = "Streak incremented! Keep it up!";
            streakIncremented = true;
        } else {
            // Missed a day or more, reset
            user.streak = 1;
            user.lastActiveDate = today;
            message = "Streak reset. Start fresh!";
            streakIncremented = true; // Technically a new streak
        }
    }

    // Add history if streak changed or for activity log
    if (streakIncremented || diff > 0) {
        user.streakHistory.push({ date: today, activity });
    }

    await user.save();
    return { streak: user.streak, message, user };
};

// Check and Update Streak Logic (Endpoint)
exports.updateStreak = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId; // Handle both auth middleware and direct calls if needed
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
        // We can allow getting streak with just a query param if not strictly protected, 
        // but usually it should be protected. Assuming protected route with req.user from middleware.
        // If not, we'll try to get from query/body for flexibility during dev.
        const userId = req.user?.id || req.query.userId;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ streak: user.streak, lastActiveDate: user.lastActiveDate });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching streak" });
    }
};
