const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Problem = require("./models/Problem");

dotenv.config({ path: path.join(__dirname, ".env") });

const generateProblems = () => {
    const allProblems = [];

    // --- JAVASCRIPT PROBLEMS ---
    const jsSeeds = [
        {
            title: "Sum of Two Numbers",
            difficulty: "Easy",
            description: "Create a function 'solution' that takes an array of two numbers and returns their sum.",
            tags: ["basics", "math"],
            testCases: [
                { input: "[5, 10]", expectedOutput: "15", isPublic: true },
                { input: "[-1, 1]", expectedOutput: "0", isPublic: true },
                { input: "[100, 200]", expectedOutput: "300", isPublic: false }
            ],
            examples: [{ input: "[5, 10]", output: "15" }],
            constraints: ["Input will always be an array of length 2", "Numbers can be negative"]
        },
        {
            title: "String Reversal",
            difficulty: "Easy",
            description: "Create a function 'solution' that takes a string and returns it reversed.",
            tags: ["strings"],
            testCases: [
                { input: "\"hello\"", expectedOutput: "olleh", isPublic: true },
                { input: "\"world\"", expectedOutput: "dlrow", isPublic: true },
                { input: "\"a\"", expectedOutput: "a", isPublic: false }
            ],
            examples: [{ input: "\"hello\"", output: "\"olleh\"" }],
            constraints: ["String length will be between 0 and 1000"]
        },
        {
            title: "Find Max in Array",
            difficulty: "Easy",
            description: "Create a function 'solution' that takes an array of numbers and returns the largest one.",
            tags: ["arrays"],
            testCases: [
                { input: "[1, 5, 3]", expectedOutput: "5", isPublic: true },
                { input: "[-10, -5, -20]", expectedOutput: "-5", isPublic: true },
                { input: "[100]", expectedOutput: "100", isPublic: false }
            ],
            examples: [{ input: "[1, 5, 3]", output: "5" }],
            constraints: ["Array will have at least one numeric element"]
        },
        {
            title: "Check Palindrome",
            difficulty: "Easy",
            description: "Create a function 'solution' that returns true if a string is a palindrome, false otherwise.",
            tags: ["strings"],
            testCases: [
                { input: "\"racecar\"", expectedOutput: "true", isPublic: true },
                { input: "\"hello\"", expectedOutput: "false", isPublic: true },
                { input: "\"madam\"", expectedOutput: "true", isPublic: false }
            ],
            examples: [{ input: "\"racecar\"", output: "true" }],
            constraints: ["Case sensitive comparison requested"]
        }
    ];

    // Pad JS to 20
    for (let i = jsSeeds.length; i < 20; i++) {
        const difficulty = i % 3 === 0 ? "Hard" : (i % 2 === 0 ? "Medium" : "Easy");
        jsSeeds.push({
            title: `JavaScript Algorithmic Challenge #${i + 1}`,
            difficulty,
            description: `Implement the specified logic for JavaScript challenge #${i + 1}. Focus on performance and edge cases.`,
            tags: ["practice", "algorithms"],
            testCases: [{ input: "1", expectedOutput: "1", isPublic: true }],
            examples: [{ input: "1", output: "1" }],
            constraints: ["Time complexity: O(n)", "Space complexity: O(1)"]
        });
    }

    const finalJS = jsSeeds.map((p, i) => ({ ...p, language: "JavaScript", order: i + 1 }));

    // --- HTML PROBLEMS ---
    const htmlSeeds = [
        {
            title: "Basic Page Title",
            difficulty: "Easy",
            description: "Define the title of your web page using the appropriate tag. The title should be 'My First Web Page'.",
            constraints: ["Use the <title> tag", "Must be placed within the <head> section"],
            examples: [{ input: "HEAD section", output: "<title>My First Web Page</title>" }],
            tags: ["basics", "seo"]
        },
        {
            title: "Paragraph and Breaks",
            difficulty: "Easy",
            description: "Create two separate paragraphs of text. In the second paragraph, use a line break to split the text into two lines without starting a new paragraph.",
            constraints: ["Use <p> tags for paragraphs", "Use <br> tag for line breaks"],
            examples: [{ input: "Text blocks", output: "Two separate paragraph blocks displayed" }],
            tags: ["basics", "formatting"]
        },
        {
            title: "Navigation Link",
            difficulty: "Easy",
            description: "Create a hyperlink that points to 'https://google.com' and has the display text 'Search Engine'. Ensure it opens in a new browser tab.",
            constraints: ["Use the <a> tag", "Use the target attribute appropriately"],
            examples: [{ input: "Link target", output: "Clickable link 'Search Engine'" }],
            tags: ["basics", "links"]
        },
        {
            title: "Hero Image",
            difficulty: "Easy",
            description: "Display an image on your page. Provide an alternative text ('Placeholder Hero') in case the image fails to load.",
            constraints: ["Use the <img> tag", "Provide the 'alt' attribute"],
            examples: [{ input: "Image source", output: "Image visible with alt text backup" }],
            tags: ["media", "accessibility"]
        },
        {
            title: "Unordered Shopping List",
            difficulty: "Easy",
            description: "Create a list of 3 items (Milk, Bread, Eggs) using a bulleted list format.",
            constraints: ["Use <ul> and <li> tags"],
            examples: [{ input: "List items", output: "Bullet pointed list of items" }],
            tags: ["basics", "lists"]
        },
        {
            title: "Numbered Recipe Steps",
            difficulty: "Easy",
            description: "Create a list of steps to make toast using a numbered list format.",
            constraints: ["Use <ol> and <li> tags"],
            examples: [{ input: "Procedure steps", output: "1. Heat pan 2. Add bread..." }],
            tags: ["basics", "lists"]
        },
        {
            title: "Interactive Button",
            difficulty: "Easy",
            description: "Add a button to your page with the text 'Click Me!'.",
            constraints: ["Use the <button> tag", "Type should be 'button'"],
            examples: [{ input: "Button text", output: "<button type='button'>Click Me!</button>" }],
            tags: ["basics", "forms"]
        },
        {
            title: "Horizontal Divider",
            difficulty: "Easy",
            description: "Place a horizontal thematic break between two sections of content.",
            constraints: ["Use the <hr> tag"],
            examples: [{ input: "Section separation", output: "A horizontal line visible across the page" }],
            tags: ["visuals", "layout"]
        },
        {
            title: "Text Emphasis",
            difficulty: "Easy",
            description: "Write a sentence and make one word **bold** and another word *italicized* to show importance.",
            constraints: ["Use <strong> or <b> for bold", "Use <em> or <i> for italic"],
            examples: [{ input: "Sentence styling", output: "Highlighted text visible as bold/italic" }],
            tags: ["basics", "formatting"]
        },
        {
            title: "Standard HTML Skeleton",
            difficulty: "Easy",
            description: "Set up the minimal boilerplate required for a valid HTML5 document.",
            constraints: ["Include <!DOCTYPE html>", "Include <html>, <head>, and <body> tags"],
            examples: [{ input: "Document setup", output: "A valid blank HTML document structure" }],
            tags: ["basics", "structure"]
        },
        {
            title: "Data Table",
            difficulty: "Medium",
            description: "Create a 3x3 table representing Employee data (Name, Role, Salary).",
            constraints: ["Use <table>, <tr>, <th>, and <td>", "First row must be headers"],
            examples: [{ input: "Tabular data", output: "Structured grid of employee records" }],
            tags: ["complex-data", "tables"]
        },
        {
            title: "User Feedback Form",
            difficulty: "Medium",
            description: "Create a form that accepts a User's Name and Email. Ensure the email field validates as an email type.",
            constraints: ["Use <form>", "Use <input type='text'> and <input type='email'>"],
            examples: [{ input: "Form inputs", output: "Type-safe input fields with labels" }],
            tags: ["forms", "validation"]
        },
        {
            title: "Gender Selection (Radio)",
            difficulty: "Medium",
            description: "Add a radio button group for Gender selection (Male, Female, Other). Ensure only one can be selected at a time.",
            constraints: ["Use <input type='radio'>", "All inputs must share the same 'name' attribute"],
            examples: [{ input: "Option choice", output: "Mutually exclusive circular toggles" }],
            tags: ["forms", "logic"]
        },
        {
            title: "Skill Checkboxes",
            difficulty: "Medium",
            description: "Create a set of checkboxes for a user to select multiple programming skills.",
            constraints: ["Use <input type='checkbox'>"],
            examples: [{ input: "Multi-select", output: "Square toggles allowing multiple checks" }],
            tags: ["forms", "lists"]
        },
        {
            title: "Country Dropdown",
            difficulty: "Medium",
            description: "Create a dropdown menu that allows a user to select their country from a list of 5 countries.",
            constraints: ["Use <select> and <option> tags"],
            examples: [{ input: "Dropdown list", output: "Expandable menu with country names" }],
            tags: ["forms", "ui"]
        },
        {
            title: "Comment Area",
            difficulty: "Medium",
            description: "Provide a large text area for a user to write long comments. Set it to 5 rows and 30 columns.",
            constraints: ["Use the <textarea> tag", "Use rows and cols attributes"],
            examples: [{ input: "Multi-line input", output: "Box for long-form text entry" }],
            tags: ["forms", "ui"]
        },
        {
            title: "Semantic Content",
            difficulty: "Medium",
            description: "Structure a page using semantic HTML5 tags including a header, a main navigation, a main content area, and a footer.",
            constraints: ["Use <header>, <nav>, <main>, and <footer>"],
            examples: [{ input: "Page structure", output: "Meaningful layout identifiable by search engines" }],
            tags: ["html5", "semantic"]
        },
        {
            title: "Responsive Figure",
            difficulty: "Medium",
            description: "Embed an image with a caption below it using the appropriate HTML5 container elements.",
            constraints: ["Use <figure> and <figcaption>"],
            examples: [{ input: "Image + Text", output: "An image with an associated caption underneath" }],
            tags: ["media", "html5"]
        },
        {
            title: "Nested Data Grid",
            difficulty: "Hard",
            description: "Design a complex table where some cells span across multiple rows or columns (e.g., a shared header for two columns).",
            constraints: ["Use the rowspan and colspan attributes"],
            examples: [{ input: "Merged cells", output: "A table with non-uniform grid layouts" }],
            tags: ["advanced", "tables"]
        },
        {
            title: "Embedded Video Player",
            difficulty: "Hard",
            description: "Add a video to your web page. Ensure it shows play/pause controls and has a width of 500px.",
            constraints: ["Use the <video> tag", "Include the 'controls' attribute"],
            examples: [{ input: "Media player", output: "Video interface visible with control buttons" }],
            tags: ["media", "advanced"]
        }
    ];

    const finalHTML = htmlSeeds.map((p, i) => ({
        ...p,
        language: "HTML",
        order: i + 1,
        testCases: [{ input: "N/A", expectedOutput: "Rendered page structure", isPublic: true }]
    }));

    // --- OTHER LANGUAGES ---
    const otherLangs = ["CSS", "Python", "Java", "C", "C++"];
    const otherProblems = [];
    otherLangs.forEach(lang => {
        for (let i = 0; i < 20; i++) {
            const difficulty = i % 3 === 0 ? "Hard" : (i % 2 === 0 ? "Medium" : "Easy");
            otherProblems.push({
                title: `${lang} ${difficulty} Challenge #${i + 1}`,
                language: lang,
                difficulty,
                description: `A technical challenge designed to test your knowledge of ${lang} core concepts. Implement a solution that meets the requirement of ${difficulty} level complexity.`,
                constraints: ["Performance should be considered", `${lang} standard practices apply`],
                examples: [{ input: "Standard input", output: "Correct expected result" }],
                tags: ["practice", "skill-test"],
                testCases: [{ input: "1", expectedOutput: "1", isPublic: true }],
                order: i + 1
            });
        }
    });

    return [...finalJS, ...finalHTML, ...otherProblems];
};

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Seeding High-Quality Interactive Problems...");
        await Problem.deleteMany({});
        const problems = generateProblems();
        await Problem.insertMany(problems);
        console.log(`Seeded ${problems.length} problems with test cases and descriptions.`);
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
