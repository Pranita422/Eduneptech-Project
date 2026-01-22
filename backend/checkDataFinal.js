const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const data = await mongoose.connection.db.collection("nepsyllabuses").find({}).toArray();

        let output = "";
        if (data.length > 0) {
            const courses = [...new Set(data.map(d => d.course))];
            output += "Unique courses found in database:\n";
            courses.forEach(c => output += `FULL_COURSE_NAME: [${c}]\n`);
        } else {
            output += "No data found in nepsyllabuses collection.\n";
        }

        fs.writeFileSync("db_check_output.txt", output);
        console.log("Output written to db_check_output.txt");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();
