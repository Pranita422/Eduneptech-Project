/**
 * Seed Script: HTML Topics Part 3
 * Usage: node seedHtmlTopicsPart3.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const htmlTopicsContent = [
    {
        topic: "HTML CSS",
        theory: `**What is CSS?**

CSS (Cascading Style Sheets) is used to style HTML elements. It controls layout, colors, fonts, and more.

---

**Three Ways to Add CSS**

**1. Inline CSS** - Using style attribute
<p style="color:blue;">Blue text</p>

**2. Internal CSS** - Using <style> in head
<head>
  <style>
    p { color: blue; }
  </style>
</head>

**3. External CSS** - Using separate .css file
<head>
  <link rel="stylesheet" href="styles.css">
</head>

---

**CSS Syntax**

selector {
  property: value;
}

---

**Example**

p {
  color: blue;
  font-size: 16px;
  margin: 10px;
}

---

**Summary**

• CSS styles your HTML
• External CSS is the best practice
• Selectors target elements to style`
    },
    {
        topic: "HTML Links",
        theory: `**HTML Links (Hyperlinks)**

Links allow users to navigate between pages. They're created with the <a> tag.

---

**Basic Syntax**

<a href="url">Link text</a>

---

**Examples**

**External Link**
<a href="https://google.com">Visit Google</a>

**Internal Link**
<a href="about.html">About Us</a>

**Email Link**
<a href="mailto:email@example.com">Email Us</a>

---

**The target Attribute**

• **_self** - Opens in same tab (default)
• **_blank** - Opens in new tab

<a href="https://google.com" target="_blank">Open in new tab</a>

---

**Link to Page Section**

<a href="#section1">Jump to Section 1</a>

<h2 id="section1">Section 1</h2>

---

**Summary**

• Use <a> tag for links
• href specifies the destination
• target="_blank" opens new tab`
    },
    {
        topic: "HTML Images",
        theory: `**HTML Images**

The <img> tag displays images on your webpage.

---

**Basic Syntax**

<img src="image.jpg" alt="Description">

---

**Required Attributes**

• **src** - Path to the image
• **alt** - Alternative text (important for accessibility)

---

**Optional Attributes**

<img src="photo.jpg" alt="Photo" width="300" height="200">

---

**Image Sources**

**Local Image**
<img src="images/photo.jpg" alt="Photo">

**Web Image**
<img src="https://example.com/image.jpg" alt="Web image">

---

**Image as Link**

<a href="fullsize.jpg">
  <img src="thumbnail.jpg" alt="Click for full size">
</a>

---

**Best Practices**

• Always include alt text
• Optimize image file sizes
• Use appropriate formats (JPG, PNG, WebP)

---

**Summary**

• <img> is self-closing (no end tag)
• src and alt are essential
• Use width/height to control size`
    },
    {
        topic: "HTML Tables",
        theory: `**HTML Tables**

Tables display data in rows and columns.

---

**Basic Structure**

<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>

---

**Table Tags**

• <table> - Table container
• <tr> - Table row
• <th> - Table header cell
• <td> - Table data cell

---

**Complete Example**

<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>30</td>
  </tr>
</table>

---

**Summary**

• Use tables for tabular data only
• <th> for headers, <td> for data
• Don't use tables for page layout`
    },
    {
        topic: "HTML Lists",
        theory: `**HTML Lists**

HTML supports three types of lists.

---

**Unordered Lists (Bullets)**

<ul>
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</ul>

---

**Ordered Lists (Numbers)**

<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>

---

**Description Lists**

<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>

---

**Nested Lists**

<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Orange</li>
    </ul>
  </li>
</ul>

---

**Summary**

• <ul> for bullet points
• <ol> for numbered lists
• <li> for list items`
    }
];

async function seedHtmlTopics() {
    try {
        console.log("🚀 Connecting...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected!\n");
        let updated = 0;
        for (const t of htmlTopicsContent) {
            const existing = await Topic.findOne({ language: "HTML", topic: t.topic });
            if (existing) {
                existing.theory = t.theory;
                await existing.save();
                console.log(`✅ ${t.topic}`);
                updated++;
            }
        }
        console.log(`\n📊 ${updated} updated`);
    } catch (e) {
        console.error("❌", e.message);
    } finally {
        await mongoose.disconnect();
    }
}
seedHtmlTopics();
