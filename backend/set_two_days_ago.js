const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config({ path: path.join(__dirname, ".env") });

const setTwoDaysAgo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const user = await User.findOne({ email: "streak@test.com" });
        if (user) {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            user.lastActiveDate = twoDaysAgo;
            await user.save();
            console.log(`Updated user ${user.email} lastActiveDate to 2 days ago: ${twoDaysAgo}`);
        } else {
            console.log("User streak@test.com not found");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

setTwoDaysAgo();
