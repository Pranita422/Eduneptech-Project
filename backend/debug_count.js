/*const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const Mcq = require("./models/Mcq");

const checkData = async () => {
    await connectDB();
    const count = await Mcq.countDocuments({});
    console.log(`TOTAL_MCQS:${count}`);
    const dsCount = await Mcq.countDocuments({ course: "B.Sc Data Science" });
    console.log(`DS_MCQS:${dsCount}`);
    const dsFyCount = await Mcq.countDocuments({ course: "B.Sc Data Science", year: "FY" });
    console.log(`DS_FY_MCQS:${dsFyCount}`);

    const frameworks = await Mcq.distinct("framework");
    console.log(`FRAMEWORKS:${frameworks.join(",")}`);

    mongoose.connection.close();
};

checkData();
*/