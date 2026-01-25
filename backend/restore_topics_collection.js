const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const restoreTopics = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for restoration...");

        const db = mongoose.connection.db;

        // 1. Get all documents from 'Tutorial'
        const tutorialDocs = await db.collection("Tutorial").find({}).toArray();
        console.log(`Found ${tutorialDocs.length} documents in 'Tutorial'.`);

        if (tutorialDocs.length > 0) {
            // 2. Ensure they have the correct fields (convert theory to content if needed)
            const cleanedDocs = tutorialDocs.map(doc => {
                const newDoc = { ...doc };
                if (newDoc.theory && !newDoc.content) {
                    newDoc.content = newDoc.theory;
                }
                delete newDoc.theory;
                return newDoc;
            });

            // 3. Insert into 'topics' (default plural of Topic model)
            console.log("Migrating documents to 'topics' collection...");

            // Optional: Clear 'topics' first to avoid duplicates if re-running
            // await db.collection("topics").deleteMany({});

            for (const doc of cleanedDocs) {
                const { _id, ...docWithoutId } = doc;
                await db.collection("topics").updateOne(
                    { language: doc.language, topic: doc.topic },
                    { $set: docWithoutId },
                    { upsert: true }
                );
            }
            console.log("Migration to 'topics' successful!");
        } else {
            console.log("No documents found in 'Tutorial' to migrate.");
        }

        // 4. Verification
        const topicCount = await db.collection("topics").countDocuments();
        console.log(`Total documents in 'topics' collection: ${topicCount}`);

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Restoration failed:", err);
        process.exit(1);
    }
};

restoreTopics();
