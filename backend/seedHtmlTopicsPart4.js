/**
 * Seed Script: Remaining HTML Topics
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const topics = [
    {
        topic: "HTML Quotations",
        theory: `**HTML Quotation Elements**

---

**Block Quote**
<blockquote cite="source">
  Quoted text goes here.
</blockquote>

**Short Quote**
<q>This is an inline quote.</q>

**Abbreviation**
<abbr title="HyperText Markup Language">HTML</abbr>

**Citation**
<cite>Book Title</cite>

**Address**
<address>
  Contact: email@example.com
</address>

---

**Summary**
• <blockquote> for long quotes
• <q> for inline quotes
• <cite> for work titles`
    },
    {
        topic: "HTML Block and Inline",
        theory: `**Block vs Inline Elements**

---

**Block Elements**

Start on a new line and take full width:
• <div>, <h1>-<h6>, <p>
• <ul>, <ol>, <li>
• <table>, <form>

**Inline Elements**

Stay on the same line:
• <span>, <a>, <img>
• <strong>, <em>
• <input>, <button>

---

**The div Element**

<div> is a container for grouping:
<div>
  <h2>Section</h2>
  <p>Content here</p>
</div>

**The span Element**

<span> is for inline grouping:
<p>My <span style="color:red;">red</span> word.</p>

---

**Summary**
• Block = new line, full width
• Inline = same line, content width
• div = block container
• span = inline container`
    },
    {
        topic: "HTML Classes",
        theory: `**The class Attribute**

Classes group elements for styling.

---

**Syntax**

<div class="classname">Content</div>

---

**Multiple Classes**

<div class="container highlight">Content</div>

---

**CSS with Classes**

.intro {
  color: blue;
  font-size: 18px;
}

<p class="intro">Styled paragraph</p>

---

**Same Class, Different Elements**

<h1 class="city">London</h1>
<p class="city">Paris</p>

Both styled the same way!

---

**Summary**
• Multiple elements can share a class
• One element can have multiple classes
• Classes are reusable across pages`
    },
    {
        topic: "HTML Id",
        theory: `**The id Attribute**

The id attribute gives a unique identifier.

---

**Syntax**

<div id="unique-name">Content</div>

---

**Key Rules**

• Each id must be unique on the page
• Names should be descriptive
• No spaces allowed

---

**CSS with IDs**

#header {
  background: blue;
  padding: 20px;
}

<div id="header">Welcome</div>

---

**JavaScript with IDs**

document.getElementById("demo").innerHTML = "Hello!";

---

**id vs class**

• id = unique, one element only
• class = can be shared by many elements

---

**Summary**
• Use id for unique elements
• Use class for groups
• IDs are useful for JavaScript`
    },
    {
        topic: "HTML Quotations",
        theory: `**HTML Quotation and Citation Elements**

---

**Block Quotations**
<blockquote cite="https://source.com">
  This is a longer quotation that stands alone.
</blockquote>

**Inline Quotes**
<p>She said <q>Hello World</q></p>

**Abbreviations**
<p><abbr title="World Wide Web">WWW</abbr></p>

---

**Summary**
• blockquote for long quotes
• q for short inline quotes
• abbr for abbreviations with titles`
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected\n");
    for (const t of topics) {
        const doc = await Topic.findOne({ language: "HTML", topic: t.topic });
        if (doc) {
            doc.theory = t.theory;
            await doc.save();
            console.log("✅", t.topic);
        }
    }
    await mongoose.disconnect();
    console.log("\nDone!");
}
seed();
