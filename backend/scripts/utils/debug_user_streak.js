const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config({ path: path.join(__dirname, ".env") });

const checkUserStreak = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB\n");

        // Find user by email (update this to your test user email)
        const userEmail = process.argv[2] || "test@example.com";

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            console.log(`❌ User not found: ${userEmail}`);
            console.log("\nUsage: node debug_user_streak.js <email>");
            return;
        }

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`User: ${user.name} (${user.email})`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        console.log("📊 Streak Data:");
        console.log(`  Current Streak: ${user.streak || 0}`);
        console.log(`  Longest Streak: ${user.longestStreak || 0}`);
        console.log(`  Last Solved Date: ${user.lastSolvedDate || 'null'}`);
        console.log(`  Last Active Date: ${user.lastActiveDate || 'null'}\n`);

        if (user.lastSolvedDate) {
            const lastSolved = new Date(user.lastSolvedDate);
            const today = new Date();

            console.log("📅 Date Analysis:");
            console.log(`  Last Solved (Raw): ${lastSolved.toISOString()}`);
            console.log(`  Last Solved (Local): ${lastSolved.toLocaleString()}`);
            console.log(`  Today (UTC): ${today.toISOString()}`);
            console.log(`  Today (Local): ${today.toLocaleString()}\n`);

            // Calculate day difference
            const getUTCStartOfDay = (date) => {
                const d = new Date(date);
                return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
            };

            const getDayDifference = (date1, date2) => {
                const utcDate1 = getUTCStartOfDay(date1);
                const utcDate2 = getUTCStartOfDay(date2);
                const diffTime = utcDate2.getTime() - utcDate1.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
            };

            const diff = getDayDifference(lastSolved, today);

            console.log("🔍 Streak Analysis:");
            console.log(`  Day Difference: ${diff}`);

            if (diff === 0) {
                console.log(`  Status: ✅ Same day - streak should stay at ${user.streak}`);
            } else if (diff === 1) {
                console.log(`  Status: 🔥 Consecutive day - streak should increment to ${user.streak + 1}`);
            } else if (diff > 1) {
                console.log(`  Status: ⏳ Gap detected (${diff} days) - streak should reset to 1`);
            } else {
                console.log(`  Status: ⚠️  Future date detected (${diff} days) - data anomaly`);
            }
        }

        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

checkUserStreak();
