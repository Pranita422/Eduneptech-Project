const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const Topic = require("./models/Topic");

const fs = require("fs");

const checkTopics = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const allNep = await mongoose.connection.db.collection("nepsyllabuses").find({}).toArray();
        console.log("Total docs in 'nepsyllabuses':", allNep.length);

        const nepFields = new Set();
        allNep.forEach(doc => {
            Object.keys(doc).forEach(key => nepFields.add(key));
        });

        const result = {
            collections: (await mongoose.connection.db.listCollections().toArray()).map(c => c.name),
            allFieldsFoundInNep: Array.from(nepFields),
            nepSample: allNep.length > 0 ? allNep[0] : null
        };

        fs.writeFileSync("backend/db_structure_output.json", JSON.stringify(result, null, 2));
        console.log("Results written to backend/db_structure_output.json");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

checkTopics();
