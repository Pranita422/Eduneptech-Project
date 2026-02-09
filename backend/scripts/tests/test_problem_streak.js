const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");
const { updateProblemStreak } = require("./controllers/streakController");

dotenv.config({ path: path.join(__dirname, ".env") });

// Helper to format dates for display
const formatDate = (date) => {
    if (!date) return "null";
    return new Date(date).toISOString();
};

const runTests = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB for Testing\n");

        // Setup Test User
        const testEmail = "streak_problem_test@example.com";
        await User.deleteOne({ email: testEmail });

        const user = new User({
            name: "Problem Streak Tester",
            email: testEmail,
            password: "hashedpassword",
            streak: 0,
            longestStreak: 0,
            lastSolvedDate: null
        });
        await user.save();
        console.log("✅ Test User Created\n");

        // ========================================
        // TEST 1: First Problem Ever
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 1: First Problem Solved");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        let result = await updateProblemStreak(user._id);
        let updatedUser = await User.findById(user._id);

        console.log(`Streak: ${updatedUser.streak} (Expected: 1)`);
        console.log(`Longest: ${updatedUser.longestStreak} (Expected: 1)`);
        console.log(`Last Solved: ${formatDate(updatedUser.lastSolvedDate)}`);
        console.log(`Message: "${result.message}"`);

        const test1Pass = updatedUser.streak === 1 &&
            updatedUser.longestStreak === 1 &&
            updatedUser.lastSolvedDate !== null;
        console.log(test1Pass ? "✅ PASS\n" : "❌ FAIL\n");

        // ========================================
        // TEST 2: Same Day (Should Not Increment)
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 2: Same Day Solve");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        result = await updateProblemStreak(user._id);
        updatedUser = await User.findById(user._id);

        console.log(`Streak: ${updatedUser.streak} (Expected: 1 - unchanged)`);
        console.log(`Longest: ${updatedUser.longestStreak} (Expected: 1)`);
        console.log(`Message: "${result.message}"`);

        const test2Pass = updatedUser.streak === 1;
        console.log(test2Pass ? "✅ PASS\n" : "❌ FAIL\n");

        // ========================================
        // TEST 3: Consecutive Day (Should Increment)
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 3: Consecutive Day (Yesterday → Today)");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // Set lastSolvedDate to yesterday (UTC midnight)
        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        yesterday.setUTCHours(0, 0, 0, 0);

        updatedUser.lastSolvedDate = yesterday;
        await updatedUser.save();
        console.log(`Set lastSolvedDate to: ${formatDate(yesterday)}`);

        result = await updateProblemStreak(user._id);
        updatedUser = await User.findById(user._id);

        console.log(`Streak: ${updatedUser.streak} (Expected: 2)`);
        console.log(`Longest: ${updatedUser.longestStreak} (Expected: 2)`);
        console.log(`Last Solved: ${formatDate(updatedUser.lastSolvedDate)}`);
        console.log(`Message: "${result.message}"`);

        const test3Pass = updatedUser.streak === 2 && updatedUser.longestStreak === 2;
        console.log(test3Pass ? "✅ PASS\n" : "❌ FAIL\n");

        // ========================================
        // TEST 4: Another Consecutive Day
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 4: Another Consecutive Day");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // Set to yesterday again
        updatedUser.lastSolvedDate = yesterday;
        await updatedUser.save();

        result = await updateProblemStreak(user._id);
        updatedUser = await User.findById(user._id);

        console.log(`Streak: ${updatedUser.streak} (Expected: 3)`);
        console.log(`Longest: ${updatedUser.longestStreak} (Expected: 3)`);
        console.log(`Message: "${result.message}"`);

        const test4Pass = updatedUser.streak === 3 && updatedUser.longestStreak === 3;
        console.log(test4Pass ? "✅ PASS\n" : "❌ FAIL\n");

        // ========================================
        // TEST 5: Gap > 1 Day (Should Reset to 1)
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 5: Gap > 1 Day (3 days ago → Today)");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // Set lastSolvedDate to 3 days ago
        const threeDaysAgo = new Date();
        threeDaysAgo.setUTCDate(threeDaysAgo.getUTCDate() - 3);
        threeDaysAgo.setUTCHours(0, 0, 0, 0);

        updatedUser.lastSolvedDate = threeDaysAgo;
        await updatedUser.save();
        console.log(`Set lastSolvedDate to: ${formatDate(threeDaysAgo)}`);

        result = await updateProblemStreak(user._id);
        updatedUser = await User.findById(user._id);

        console.log(`Streak: ${updatedUser.streak} (Expected: 1 - reset)`);
        console.log(`Longest: ${updatedUser.longestStreak} (Expected: 3 - unchanged)`);
        console.log(`Last Solved: ${formatDate(updatedUser.lastSolvedDate)}`);
        console.log(`Message: "${result.message}"`);

        const test5Pass = updatedUser.streak === 1 && updatedUser.longestStreak === 3;
        console.log(test5Pass ? "✅ PASS\n" : "❌ FAIL\n");

        // ========================================
        // TEST 6: Verify UTC Normalization
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST 6: UTC Normalization Check");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        updatedUser = await User.findById(user._id);
        const storedDate = new Date(updatedUser.lastSolvedDate);

        console.log(`Stored Date: ${formatDate(storedDate)}`);
        console.log(`Hours: ${storedDate.getUTCHours()} (Expected: 0)`);
        console.log(`Minutes: ${storedDate.getUTCMinutes()} (Expected: 0)`);
        console.log(`Seconds: ${storedDate.getUTCSeconds()} (Expected: 0)`);
        console.log(`Milliseconds: ${storedDate.getUTCMilliseconds()} (Expected: 0)`);

        const test6Pass = storedDate.getUTCHours() === 0 &&
            storedDate.getUTCMinutes() === 0 &&
            storedDate.getUTCSeconds() === 0 &&
            storedDate.getUTCMilliseconds() === 0;
        console.log(test6Pass ? "✅ PASS - Date is normalized to UTC midnight\n" : "❌ FAIL - Date is not properly normalized\n");

        // ========================================
        // Summary
        // ========================================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("TEST SUMMARY");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        const allPassed = test1Pass && test2Pass && test3Pass && test4Pass && test5Pass && test6Pass;

        console.log(`Test 1 (First Solve): ${test1Pass ? "✅" : "❌"}`);
        console.log(`Test 2 (Same Day): ${test2Pass ? "✅" : "❌"}`);
        console.log(`Test 3 (Consecutive Day): ${test3Pass ? "✅" : "❌"}`);
        console.log(`Test 4 (Another Consecutive): ${test4Pass ? "✅" : "❌"}`);
        console.log(`Test 5 (Gap Reset): ${test5Pass ? "✅" : "❌"}`);
        console.log(`Test 6 (UTC Normalization): ${test6Pass ? "✅" : "❌"}`);
        console.log("");
        console.log(allPassed ? "🎉 ALL TESTS PASSED!" : "⚠️  SOME TESTS FAILED");

        // Cleanup
        await User.deleteOne({ email: testEmail });
        console.log("\n✅ Test User Cleaned Up");

    } catch (err) {
        console.error("❌ Test Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

runTests();
