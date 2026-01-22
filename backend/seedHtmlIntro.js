/**
 * Seed Script: Introduction to HTML
 * 
 * This script inserts the "Introduction to HTML" topic with detailed
 * beginner-friendly theory content into the MongoDB database.
 * 
 * Usage: node seedHtmlIntro.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const MONGO_URL = process.env.MONGO_URL;

const htmlIntroContent = {
    language: "HTML",
    topic: "Introduction to HTML",
    theory: `**What is HTML?**

HTML stands for **HyperText Markup Language**. It is the standard language used to create and structure content on web pages. Think of HTML as the skeleton or foundation of every website you visit. Without HTML, web browsers wouldn't know how to display text, images, links, or any other content.

HTML is not a programming language—it's a **markup language**. This means it uses special "tags" to mark up or label different parts of content so that browsers understand what each part represents.

---

**Why is HTML Important?**

1. **Foundation of the Web**: Every website on the internet uses HTML. Whether it's a simple blog or a complex e-commerce platform, HTML is the starting point.

2. **Easy to Learn**: HTML has a simple and intuitive syntax, making it perfect for beginners who are just starting their web development journey.

3. **Universal Support**: All web browsers (Chrome, Firefox, Safari, Edge) understand HTML, ensuring your content works everywhere.

4. **Essential Skill**: Learning HTML opens doors to other web technologies like CSS (for styling) and JavaScript (for interactivity).

---

**How Does HTML Work?**

When you type a website address in your browser, the server sends an HTML file to your browser. The browser then reads this file and displays the content according to the HTML tags used.

For example:
• The browser sees a heading tag and displays larger, bold text
• It sees a paragraph tag and displays normal text
• It sees an image tag and displays a picture

---

**Basic Structure of an HTML Document**

Every HTML document follows a standard structure. Here's what a basic HTML file looks like:

<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to My Website!</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>

Let's break down each part:

• **<!DOCTYPE html>**: This declaration tells the browser that this document is written in HTML5 (the latest version).

• **<html>**: The root element that wraps all the content on the page.

• **<head>**: Contains meta-information about the page (like the title, character encoding, and links to stylesheets). This content is not displayed on the page itself.

• **<title>**: Sets the title that appears in the browser tab.

• **<body>**: Contains all the visible content that users see on the webpage.

---

**Understanding HTML Tags**

HTML uses **tags** to define elements. Tags are keywords surrounded by angle brackets (< >). Most tags come in pairs:

• **Opening tag**: <tagname> — starts the element
• **Closing tag**: </tagname> — ends the element (notice the forward slash)

Example:
<p>This is a paragraph.</p>

Some tags are **self-closing** and don't need a closing tag:
<img src="photo.jpg" alt="A photo">
<br>

---

**Common HTML Tags You Should Know**

**1. Headings (<h1> to <h6>)**

Headings organize content with six levels of importance:
<h1>Main Heading (Largest)</h1>
<h2>Sub Heading</h2>
<h3>Section Heading</h3>
<h4>Smaller Heading</h4>
<h5>Even Smaller</h5>
<h6>Smallest Heading</h6>

**2. Paragraphs (<p>)**

Used for regular text content:
<p>This is a paragraph of text. It can contain multiple sentences and will automatically wrap to new lines.</p>

**3. Links (<a>)**

Create clickable hyperlinks to other pages:
<a href="https://www.google.com">Click here to visit Google</a>

The href attribute specifies the destination URL.

**4. Images (<img>)**

Display images on your page:
<img src="picture.jpg" alt="Description of the image">

• src: The source/path to the image file
• alt: Alternative text (shown if image fails to load, also helps accessibility)

**5. Line Breaks (<br>)**

Forces text to continue on a new line:
<p>First line<br>Second line</p>

**6. Horizontal Rule (<hr>)**

Creates a horizontal line for visual separation:
<p>Section 1</p>
<hr>
<p>Section 2</p>

---

**HTML Attributes**

Attributes provide additional information about elements. They are always placed in the opening tag:

<tagname attribute="value">Content</tagname>

Common attributes include:
• id: Unique identifier for an element
• class: Groups elements for styling
• src: Source file for images/media
• href: URL for links
• alt: Alternative text for images
• style: Inline CSS styling

---

**Your First HTML Page**

Let's create a complete example that combines everything we've learned:

<!DOCTYPE html>
<html>
  <head>
    <title>My Learning Journey</title>
  </head>
  <body>
    <h1>Welcome to HTML!</h1>
    <p>HTML is the foundation of all web pages. Today, you're taking your first step into web development!</p>
    
    <h2>What I'm Learning</h2>
    <p>I'm learning how to:</p>
    <ul>
      <li>Create web page structure</li>
      <li>Add headings and paragraphs</li>
      <li>Insert images and links</li>
    </ul>
    
    <h2>Useful Resources</h2>
    <p>Visit <a href="https://www.w3schools.com">W3Schools</a> for more tutorials!</p>
    
    <hr>
    <p>Keep learning and practicing! 🚀</p>
  </body>
</html>

---

**Tips for Beginners**

1. **Practice regularly**: The more you write HTML, the more natural it becomes.

2. **Use proper indentation**: It makes your code easier to read and debug.

3. **Validate your code**: Use online validators to check for errors.

4. **View page source**: Right-click on any webpage and select "View Page Source" to see how real websites use HTML.

5. **Start simple**: Build small projects first, then gradually add complexity.

---

**Summary**

• HTML stands for HyperText Markup Language
• It's the standard language for creating web pages
• HTML uses tags to structure content
• Every HTML document has a basic structure: <!DOCTYPE>, <html>, <head>, and <body>
• Common tags include headings, paragraphs, links, and images
• Attributes provide extra information about elements

Congratulations! You've just learned the fundamentals of HTML. Keep practicing, and soon you'll be building amazing websites! 🎉`,
    completedBy: []
};

async function seedHtmlIntro() {
    try {
        console.log("🚀 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to MongoDB successfully!\n");

        // Check if the topic already exists
        const existingTopic = await Topic.findOne({
            language: "HTML",
            topic: "Introduction to HTML"
        });

        if (existingTopic) {
            console.log("⚠️  Topic 'Introduction to HTML' already exists.");
            console.log("   Updating theory content...\n");

            existingTopic.theory = htmlIntroContent.theory;
            await existingTopic.save();

            console.log("✅ Topic updated successfully!");
            console.log(`   ID: ${existingTopic._id}`);
        } else {
            console.log("📝 Creating new topic: 'Introduction to HTML'...\n");

            const newTopic = new Topic(htmlIntroContent);
            await newTopic.save();

            console.log("✅ Topic created successfully!");
            console.log(`   ID: ${newTopic._id}`);
        }

        console.log("\n📊 Current HTML topics in database:");
        const htmlTopics = await Topic.find({ language: "HTML" }).select("topic -_id");
        htmlTopics.forEach((t, i) => console.log(`   ${i + 1}. ${t.topic}`));

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("\n🔌 Disconnected from MongoDB.");
        process.exit(0);
    }
}

seedHtmlIntro();
