require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

async function checkJS() {
    await mongoose.connect(process.env.MONGO_URL);
    const topics = await Topic.find({ language: "JavaScript" }).select("topic theory");
    console.log("\nJavaScript Topics in Database:\n");
    topics.forEach(t => {
        const hasContent = t.theory && t.theory.length > 0;
        console.log(`${hasContent ? '✅' : '❌'} ${t.topic}`);
    });
    console.log(`\nTotal: ${topics.length} topics`);
    await mongoose.disconnect();
}

checkJS();
