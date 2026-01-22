const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        const data = await mongoose.connection.db.collection("nepsyllabuses").find({}).toArray();
        console.log("Total entries in nepsyllabuses:", data.length);

        if (data.length > 0) {
            const counts = {};
            data.forEach(d => {
                counts[d.course] = (counts[d.course] || 0) + 1;
            });
            console.log("Document counts per course:", counts);
        } else {
            console.log("No data found in nepsyllabuses collection.");
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();
