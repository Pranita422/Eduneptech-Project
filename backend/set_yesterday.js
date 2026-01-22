const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config({ path: path.join(__dirname, ".env") });

const setYesterday = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const user = await User.findOne({ email: "streak@test.com" });
        if (user) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            user.lastActiveDate = yesterday;
            await user.save();
            console.log(`Updated user ${user.email} lastActiveDate to yesterday: ${yesterday}`);
        } else {
            console.log("User streak@test.com not found");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

setYesterday();
