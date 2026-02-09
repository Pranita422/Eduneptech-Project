const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

async function resetStreak(email) {
    if (!email) {
        console.log("Please provide an email.");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB...");

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log("User not found:", email);
            return;
        }

        user.streak = 0;
        user.longestStreak = 0;
        user.lastSolvedDate = null;
        user.lastActiveDate = null;

        await user.save();
        console.log(`Streak reset to 0 for: ${email}`);
    } catch (err) {
        console.error("Error resetting streak:", err);
    } finally {
        await mongoose.disconnect();
    }
}

const emailArg = process.argv[2];
resetStreak(emailArg);
