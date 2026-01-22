/*const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const Mcq = require("./models/Mcq");

const checkData = async () => {
    await connectDB();

    try {
        const allMcqs = await Mcq.find({});
        console.log(`Total MCQs found: ${allMcqs.length}`);
        if (allMcqs.length > 0) {
            console.log("Sample MCQ structure:");
            console.log(JSON.stringify(allMcqs[0], null, 2));

            console.log("\nUnique Courses found:");
            const courses = await Mcq.distinct("course");
            console.log(courses);

            console.log("\nUnique Years found:");
            const years = await Mcq.distinct("year");
            console.log(years);

            console.log("\nUnique Frameworks found:");
            const frameworks = await Mcq.distinct("framework");
            console.log(frameworks);

            // Check specifically for what the user is looking for (assuming B.Sc Data Science FY)
            const dsFy = await Mcq.find({ course: "B.Sc Data Science", year: "FY" });
            console.log(`\nExact match count for { course: "B.Sc Data Science", year: "FY" }: ${dsFy.length}`);

            const dsFyNep = await Mcq.find({ course: "B.Sc Data Science", year: "FY", framework: "NEP" });
            console.log(`Exact match count for { course: "B.Sc Data Science", year: "FY", framework: "NEP" }: ${dsFyNep.length}`);

        } else {
            console.log("No MCQs found in the database. Collection might be empty or wrong collection name.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

checkData();
*/