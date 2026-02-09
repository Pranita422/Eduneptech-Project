const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function testStreakAPI(email) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return console.log("User not found");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await mongoose.disconnect();

        console.log("Testing GET /api/streak...");
        const res = await axios.get("http://localhost:5000/api/streak", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("API Response:", res.data);

    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) console.log(err.response.data);
    }
}

const emailArg = process.argv[2];
testStreakAPI(emailArg);
