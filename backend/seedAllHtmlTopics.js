/**
 * Seed Script: All HTML Topics
 * Populates theory content for all HTML topics in MongoDB
 * Usage: node seedAllHtmlTopics.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const htmlTopicsContent = [
    {
        topic: "HTML Editors",
        theory: `**What is an HTML Editor?**

An HTML editor is a software application used for creating and editing HTML code. Just like you need a word processor to write documents, you need an editor to write HTML code.

---

**Types of HTML Editors**

**1. Simple Text Editors**
• Notepad (Windows)
• TextEdit (Mac)
• These are basic but work for learning

**2. Code Editors (Recommended)**
• **Visual Studio Code** - Free, powerful, most popular
• **Sublime Text** - Fast and lightweight
• **Atom** - Free and customizable

**3. Web-Based Editors**
• CodePen
• JSFiddle
• W3Schools Tryit Editor

---

**Why Use VS Code?**

Visual Studio Code is recommended because:
• Free and open source
• Syntax highlighting (colors your code)
• Auto-completion (suggests code as you type)
• Built-in terminal
• Extensions for extra features

---

**Creating Your First HTML File**

1. Open your editor
2. Create a new file
3. Save it with .html extension (e.g., index.html)
4. Write your HTML code
5. Open the file in a browser to see the result

---

**Summary**

• HTML editors help you write code efficiently
• VS Code is the most popular choice for beginners
• Always save your files with .html extension`
    },
    {
        topic: "HTML Basic Examples",
        theory: `**Your First HTML Page**

Let's create a simple HTML page step by step.

---

**Example 1: Basic Page Structure**

<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first webpage.</p>
</body>
</html>

---

**Example 2: Adding a Link**

<a href="https://www.google.com">Visit Google</a>

This creates a clickable link to Google.

---

**Example 3: Adding an Image**

<img src="photo.jpg" alt="My Photo">

• **src** - path to the image file
• **alt** - text shown if image fails to load

---

**Example 4: Creating a List**

<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

---

**Practice Tips**

1. Type out each example yourself (don't copy-paste)
2. Experiment by changing values
3. View your changes in the browser
4. Make mistakes - that's how you learn!`
    },
    {
        topic: "HTML Elements",
        theory: `**What is an HTML Element?**

An HTML element is everything from the start tag to the end tag. It defines the structure and content of a webpage.

---

**Anatomy of an Element**

<tagname>Content goes here</tagname>

• **Opening tag**: <tagname>
• **Content**: The text or nested elements
• **Closing tag**: </tagname>

---

**Examples of Elements**

<h1>This is a heading element</h1>
<p>This is a paragraph element</p>
<a href="url">This is a link element</a>

---

**Nested Elements**

Elements can contain other elements:

<div>
  <h1>Welcome</h1>
  <p>This paragraph is inside a div.</p>
</div>

---

**Empty Elements**

Some elements have no content and no closing tag:

<br> - Line break
<hr> - Horizontal rule
<img src="image.jpg" alt="description">

---

**Block vs Inline Elements**

**Block elements** start on a new line:
• <div>, <h1>-<h6>, <p>, <ul>, <li>

**Inline elements** stay on the same line:
• <span>, <a>, <strong>, <em>, <img>

---

**Summary**

• Elements are building blocks of HTML
• Most elements have opening and closing tags
• Elements can be nested inside each other
• Block elements start on new lines, inline elements don't`
    },
    {
        topic: "HTML Attributes",
        theory: `**What are HTML Attributes?**

Attributes provide additional information about HTML elements. They are always specified in the opening tag.

---

**Attribute Syntax**

<tagname attribute="value">Content</tagname>

• Attributes come in name/value pairs
• Values should be in quotes

---

**Common Attributes**

**1. href** - Specifies URL for links
<a href="https://google.com">Google</a>

**2. src** - Specifies source for images
<img src="photo.jpg">

**3. alt** - Alternative text for images
<img src="photo.jpg" alt="A beautiful sunset">

**4. width and height** - Size of elements
<img src="photo.jpg" width="300" height="200">

**5. style** - Inline CSS styling
<p style="color: blue;">Blue text</p>

---

**The id Attribute**

Gives a unique identifier to an element:

<h1 id="main-title">Welcome</h1>

• Each id must be unique on the page
• Used for styling and JavaScript

---

**The class Attribute**

Groups elements together:

<p class="intro">First paragraph</p>
<p class="intro">Second paragraph</p>

• Multiple elements can share the same class
• Used for styling groups of elements

---

**Summary**

• Attributes add extra information to elements
• Always placed in the opening tag
• Use quotes around attribute values
• id is unique, class can be shared`
    },
    {
        topic: "HTML Headings",
        theory: `**What are HTML Headings?**

Headings define titles and subtitles on your webpage. HTML provides six levels of headings, from h1 (largest) to h6 (smallest).

---

**The Six Heading Levels**

<h1>Heading 1 - Main Title</h1>
<h2>Heading 2 - Major Sections</h2>
<h3>Heading 3 - Subsections</h3>
<h4>Heading 4 - Sub-subsections</h4>
<h5>Heading 5 - Minor headings</h5>
<h6>Heading 6 - Smallest heading</h6>

---

**Why Headings Matter**

**1. Structure** - Organize your content logically

**2. SEO** - Search engines use headings to understand content

**3. Accessibility** - Screen readers use headings to navigate

**4. Styling** - Easy to style different sections

---

**Best Practices**

• Use only ONE h1 per page (main title)
• Don't skip heading levels (h1 → h2 → h3)
• Use headings for structure, not just to make text big
• Keep headings descriptive and concise

---

**Example Page Structure**

<h1>My Website</h1>

<h2>About Me</h2>
<p>Introduction paragraph...</p>

<h2>My Projects</h2>
<h3>Project 1</h3>
<p>Description...</p>
<h3>Project 2</h3>
<p>Description...</p>

---

**Summary**

• h1 is the most important, h6 is the least
• Use headings to create document structure
• Only one h1 per page
• Don't skip heading levels`
    }
];

async function seedHtmlTopics() {
    try {
        console.log("🚀 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected!\n");

        let updated = 0, created = 0;

        for (const topicData of htmlTopicsContent) {
            const existing = await Topic.findOne({
                language: "HTML",
                topic: topicData.topic
            });

            if (existing) {
                existing.theory = topicData.theory;
                await existing.save();
                console.log(`✅ Updated: ${topicData.topic}`);
                updated++;
            } else {
                await Topic.create({
                    language: "HTML",
                    topic: topicData.topic,
                    theory: topicData.theory,
                    completedBy: []
                });
                console.log(`✨ Created: ${topicData.topic}`);
                created++;
            }
        }

        console.log(`\n📊 Summary: ${updated} updated, ${created} created`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected.");
    }
}

seedHtmlTopics();
