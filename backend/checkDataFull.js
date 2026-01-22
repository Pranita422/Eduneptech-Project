const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const data = await mongoose.connection.db.collection("nepsyllabuses").find({}).toArray();

        if (data.length > 0) {
            const courses = [...new Set(data.map(d => d.course))];
            console.log("Unique courses found in database:");
            courses.forEach(c => console.log(`FULL_COURSE_NAME: [${c}]`));
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
