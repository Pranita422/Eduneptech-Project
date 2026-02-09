const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

async function testWithForgedToken(email) {
    if (!email) {
        console.log("Usage: node test_forged_token.js <email>");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log("User not found for forging token.");
            return;
        }

        console.log(`User found: ${user.name} (${user._id})`);

        // Forge Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Token forged successfully.");

        await mongoose.disconnect(); // Disconnect before making HTTP request to avoid hanging

        // Test API
        console.log("Testing GET /api/progress/elite...");
        const eliteRes = await axios.get("http://localhost:5000/api/progress/elite", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("SUCCESS! API Returned Data:");
        console.log(JSON.stringify(eliteRes.data.readiness, null, 2));
        console.log("Full breakdown:", JSON.stringify(eliteRes.data.breakdown, null, 2));

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
testWithForgedToken(emailArg);
