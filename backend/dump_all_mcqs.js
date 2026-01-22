const mongoose = require('mongoose');
const Mcq = require('./models/Mcq');
require('dotenv').config();
const fs = require('fs');

async function dump() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
        const mcqs = await Mcq.find({});
        fs.writeFileSync('all_mcqs_dump.json', JSON.stringify(mcqs, null, 2));
        console.log(`Dumped ${mcqs.length} MCQs to all_mcqs_dump.json`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

dump();
