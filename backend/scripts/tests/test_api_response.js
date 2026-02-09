const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Problem = require("./models/Problem");
const ProblemProgress = require("./models/ProblemProgress");
const User = require("./models/User");

dotenv.config({ path: path.join(__dirname, ".env") });

const testApi = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for API test");

        const user = await User.findOne({ email: "ram123@gmail.com" });
        if (!user) {
            console.error("User ram123@gmail.com not found");
            return;
        }
        console.log(`Testing for user: ${user._id} (${user.email})`);

        const language = "JavaScript";
        const problems = await Problem.find({ language });
        console.log(`Found ${problems.length} problems for ${language}`);

        const userProgress = await ProblemProgress.find({ userId: user._id });
        console.log(`User has ${userProgress.length} progress records`);

        const completedProblemIds = new Set(userProgress.map(p => p.problemId.toString()));
        console.log("Completed IDs:", Array.from(completedProblemIds));

        const problemsWithStatus = problems.map(problem => ({
            title: problem.title,
            _id: problem._id,
            completed: completedProblemIds.has(problem._id.toString())
        }));

        console.log("Problems with Status:");
        problemsWithStatus.forEach(p => {
            console.log(`- ${p.title}: ${p.completed}`);
        });

        mongoose.connection.close();
    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    }
};

testApi();
