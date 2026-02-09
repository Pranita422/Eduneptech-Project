const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

async function testSubmitFix(email) {
    if (!email) {
        console.log("Usage: node test_submit_api_fix.js <email>");
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log("User not found.");
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await mongoose.disconnect();

        console.log(`Testing Submission for ${user.name} without userId in body...`);

        // Hardcoded problem ID that exists (using from debug logs: 6976375b4637f31a91ac6e30)
        const problemId = "6976375b4637f31a91ac6e30";

        const res = await axios.post("http://localhost:5000/api/submissions",
            {
                problemId: problemId,
                language: "javascript",
                code: "function solution(input) { return input; }" // Simple echo for testing
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.log("Submission Status:", res.status);
        console.log("Result:", res.data.result);
        console.log("Message:", res.data.message);

    } catch (err) {
        console.error("Test Failed!");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Data: ${JSON.stringify(err.response.data)}`);
        } else {
            console.error(err);
        }
    }
}

const emailArg = process.argv[2];
testSubmitFix(emailArg);
