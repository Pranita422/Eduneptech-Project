const mongoose = require("mongoose");
const Problem = require("./models/Problem");
const Submission = require("./models/Submission");
require("dotenv").config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        const problemId = "6976375b4637f31a91ac6dec";
        const problem = await Problem.findById(problemId);
        if (!problem) {
            console.log("Problem not found!");
        } else {
            console.log("Problem Found:", problem.title);
            console.log("Test Cases:", problem.testCases ? problem.testCases.length : 0);
        }

        const submissions = await Submission.find({ problemId }).sort({ timestamp: -1 }).limit(5);
        console.log(`Recent submissions for this problem: ${submissions.length}`);
        submissions.forEach(s => {
            console.log(`- Result: ${s.result}, Date: ${s.timestamp}, Code snippet: ${s.code.substring(0, 20)}...`);
        });

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

debug();
