const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Existing Collections:", collections.map(c => c.name));

        const tutorialDocs = await mongoose.connection.db.collection("Tutorial").find({}).limit(5).toArray();
        console.log("Sample documents from 'Tutorial' collection:", JSON.stringify(tutorialDocs, null, 2));

        const languages = await mongoose.connection.db.collection("Tutorial").distinct("language");
        console.log("Distinct languages in 'Tutorial':", languages);

        await mongoose.connection.close();
    } catch (err) {
        console.error("Debug failed:", err);
    }
};

debugDB();
