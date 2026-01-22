const mongoose = require('mongoose');
const Mcq = require('./models/Mcq');
require('dotenv').config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
        const distribution = await Mcq.aggregate([
            { $group: { _id: { course: '$course', year: '$year' }, count: { $sum: 1 } } }
        ]);
        console.log(JSON.stringify(distribution, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
