const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");
const { updateStreak } = require("./controllers/streakController");

dotenv.config({ path: path.join(__dirname, ".env") });

// Mock Response Object
const mockRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.data = data;
        return res;
    };
    return res;
};

const runTests = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for Testing");

        // 1. Setup Test User
        const testEmail = "streak_automated_test@example.com";
        await User.deleteOne({ email: testEmail });

        const user = new User({
            name: "Streak Tester",
            email: testEmail,
            password: "hashedpassword",
            streak: 5,
            lastActiveDate: new Date() // Initially today
        });
        await user.save();
        console.log("Test User Created");

        // TEST 1: Same Day Activity (Should not increment)
        console.log("\n--- TEST 1: Same Day Activity ---");
        let req = { user: { id: user._id } }; // Auth middleware style
        let res = mockRes();
        await updateStreak(req, res);

        let updatedUser = await User.findById(user._id);
        console.log(`Result: Streak ${updatedUser.streak} (Expected: 5)`);
        console.log(`Message: ${res.data.message}`);
        if (updatedUser.streak === 5) console.log("✅ PASS"); else console.log("❌ FAIL");

        // TEST 2: Yesterday Activity (Should Increment)
        console.log("\n--- TEST 2: Consecutive Day (Increment) ---");
        // Manually set date to yesterday
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        updatedUser.lastActiveDate = yesterday;
        await updatedUser.save();

        req = { user: { id: user._id }, body: { activity: "Test Increment" } };
        res = mockRes();
        await updateStreak(req, res);

        updatedUser = await User.findById(user._id);
        console.log(`Result: Streak ${updatedUser.streak} (Expected: 6)`);
        console.log(`Message: ${res.data.message}`);
        if (updatedUser.streak === 6) console.log("✅ PASS"); else console.log("❌ FAIL");

        // TEST 3: Missed Day (Should Reset)
        console.log("\n--- TEST 3: Missed Day (Reset) ---");
        // Set date to 2 days ago
        let twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        updatedUser.lastActiveDate = twoDaysAgo;
        await updatedUser.save();

        req = { user: { id: user._id }, body: { activity: "Test Reset" } };
        res = mockRes();
        await updateStreak(req, res);

        updatedUser = await User.findById(user._id);
        console.log(`Result: Streak ${updatedUser.streak} (Expected: 1)`);
        console.log(`Message: ${res.data.message}`);
        if (updatedUser.streak === 1) console.log("✅ PASS"); else console.log("❌ FAIL");

        // Cleanup
        await User.deleteOne({ email: testEmail });
        console.log("\nTest User Cleaned Up");

    } catch (err) {
        console.error("Test Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

runTests();
