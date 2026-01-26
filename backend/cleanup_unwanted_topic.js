const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for cleanup...");

        const result = await Topic.deleteOne({ topic: "Test Topic HTML" });
        if (result.deletedCount > 0) {
            console.log("Successfully removed 'Test Topic HTML'.");
        } else {
            console.log("'Test Topic HTML' not found.");
        }

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Cleanup failed:", err);
        process.exit(1);
    }
};

cleanup();
