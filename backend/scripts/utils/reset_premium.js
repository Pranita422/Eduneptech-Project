const mongoose = require("mongoose");
const User = require("./models/User");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function resetPremium(email) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Try sensitive search if insensitive fails
            const user2 = await User.findOne({ email: email });
            if (!user2) {
                console.log("User not found:", email);
                return;
            }
            user2.isPremium = false;
            await user2.save();
            console.log("Premium status reset for (sensitive match):", email);
        } else {
            user.isPremium = false;
            await user.save();
            console.log("Premium status reset for:", email);
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

resetPremium("ram123@gmail.com");
