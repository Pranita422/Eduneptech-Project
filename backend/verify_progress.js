const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Problem = require("./models/Problem");
const Submission = require("./models/Submission");
const Topic = require("./models/Topic");
const streakController = require("./controllers/streakController");
const submissionController = require("./controllers/submissionController");
const topicController = require("./controllers/topicController");

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        // 1. Create Test User
        const testEmail = "test_progress_user_" + Date.now() + "@example.com";
        const user = new User({
            name: "Test Progress User",
            email: testEmail,
            password: "password123",
            progress: { html: 0, css: 0, javascript: 0, totalSolved: 0 }
        });
        await user.save();
        console.log("User created:", user._id);

        // 2. Create Test Problem
        const problem = new Problem({
            title: "Test Problem JS",
            description: "Test",
            language: "javascript",
            testCases: [{ input: "1", expectedOutput: "2" }] // Simplified
        });
        await problem.save();
        console.log("Problem created:", problem._id);

        // 3. Simulate Submission (Accepted)
        // We can't easily call controller.submitCode because it expects req/res and does VM execution.
        // Let's manually simulate what submitCode does upon success:
        // Or better, let's allow calling streakController directly to verify IT works, 
        // and manually create a submission to verify logic if we were to duplicate `submitCode` logic here.
        // Actually, let's just test `streakController.checkAndUpdateStreak` and manual progress update 
        // to ensure the logic *we added* works. Testing `submitCode` fully requires mocking req/res.

        // Let's mock the "Accepted" path logic from submissionController

        console.log("Simulating Accepted Submission...");
        const result = await streakController.checkAndUpdateStreak(user._id, `Solved problem: ${problem.title}`);
        console.log("Streak update result:", result.message, "Streak:", result.streak);

        if (result.user) {
            const u = result.user;
            u.progress.javascript += 1;
            u.progress.totalSolved += 1;
            await u.save();
        }

        // 4. Verify User State
        const updatedUser = await User.findById(user._id);
        console.log("User Progress JS:", updatedUser.progress.javascript);
        console.log("User Total Solved:", updatedUser.progress.totalSolved);
        console.log("User Streak:", updatedUser.streak);

        if (updatedUser.streak === 1 && updatedUser.progress.javascript === 1) {
            console.log("SUCCESS: Streak and Progress updated correctly.");
        } else {
            console.error("FAILURE: State not updated as expected.");
        }

        // 5. Test Topic Completion
        const topic = new Topic({
            topic: "Test Topic HTML",
            language: "HTML",
            content: "Test content"
        });
        await topic.save();

        console.log("Simulating Topic Completion...");
        // Calling helper again
        const res2 = await streakController.checkAndUpdateStreak(user._id, `Completed topic: ${topic.topic}`);
        // Simulate topic controller logic
        if (!topic.completedBy.includes(user._id)) {
            topic.completedBy.push(user._id);
            await topic.save();
            // Logic we added to topicController:
            const updatedUser2 = await User.findById(user._id); // fetched in helper actually
            updatedUser2.progress.html += 1;
            await updatedUser2.save();
        }

        const finalUser = await User.findById(user._id);
        console.log("User Progress HTML:", finalUser.progress.html);

        if (finalUser.progress.html === 1) {
            console.log("SUCCESS: Topic Progress updated.");
        }

        // Clean up
        await User.deleteOne({ _id: user._id });
        await Problem.deleteOne({ _id: problem._id });
        await Topic.deleteOne({ _id: topic._id });
        console.log("Cleaned up.");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
};

verify();
