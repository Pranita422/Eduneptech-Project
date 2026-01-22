/*const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Mcq = require("./models/Mcq");

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const allMcqs = await Mcq.find({});
        console.log("Total MCQs in DB:", allMcqs.length);

        allMcqs.forEach(m => {
            console.log(`- Course: [${m.course}], Year: [${m.year}], Framework: [${m.framework}]`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();*/
