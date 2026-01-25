const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const topics = [
    // HTML
    {
        language: "HTML",
        topic: "Introduction to HTML",
        theory: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.",
        slug: "introduction-to-html",
        order: 1
    },
    {
        language: "HTML",
        topic: "HTML Elements",
        theory: "An HTML element is defined by a start tag, some content, and an end tag: `<tagname>Content goes here...</tagname>`. The HTML element is everything from the start tag to the end tag.",
        slug: "html-elements",
        order: 2
    },
    // JavaScript
    {
        language: "JavaScript",
        topic: "Introduction to JavaScript",
        theory: "JavaScript is a versatile, high-level, interpreted programming language that is a core technology of the World Wide Web, alongside HTML and CSS.",
        slug: "introduction-to-javascript",
        order: 1
    },
    {
        language: "JavaScript",
        topic: "ES6 Features",
        theory: "ECMAScript 2015 (ES6) introduced many new features including `let`, `const`, arrow functions, template literals, and classes.",
        slug: "es6-features",
        order: 2
    },
    // Python
    {
        language: "Python",
        topic: "Introduction to Python",
        theory: "Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.",
        slug: "introduction-to-python",
        order: 1
    },
    {
        language: "Python",
        topic: "Lists and Dictionaries",
        theory: "Lists are used to store multiple items in a single variable. Dictionaries are used to store data values in key:value pairs.",
        slug: "lists-and-dictionaries",
        order: 2
    },
    // C
    {
        language: "C",
        topic: "Introduction to C",
        theory: "C is a powerful general-purpose programming language. It can be used to develop software like operating systems, databases, compilers, and so on.",
        slug: "introduction-to-c",
        order: 1
    },
    {
        language: "C",
        topic: "Pointers",
        theory: "A pointer is a variable whose value is the address of another variable, i.e., direct address of the memory location.",
        slug: "pointers",
        order: 2
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for seeding (Revert to theory)...");

        // Clear and re-seed to ensure correct fields
        await Topic.deleteMany({});
        console.log("Cleared collection.");

        for (const topic of topics) {
            await Topic.updateOne(
                { language: topic.language, topic: topic.topic },
                { $set: topic },
                { upsert: true }
            );
        }
        console.log("Seeding/Update successful (Theory field active)!");

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Seeding/Migration failed:", err);
        process.exit(1);
    }
};

seedDB();
