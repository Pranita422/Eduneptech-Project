/**
 * Seed Script: More HTML Topics (Part 2)
 * Usage: node seedHtmlTopicsPart2.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const htmlTopicsContent = [
    {
        topic: "HTML Paragraphs",
        theory: `**What are HTML Paragraphs?**

The <p> tag defines a paragraph in HTML. Browsers automatically add space before and after paragraphs.

---

**Basic Syntax**

<p>This is a paragraph of text.</p>
<p>This is another paragraph.</p>

---

**Key Points**

• Paragraphs start on a new line
• Browsers add margins automatically
• Extra spaces in your code are ignored

---

**Line Breaks**

Use <br> to create a line break without starting a new paragraph:

<p>This is line one.<br>This is line two.</p>

---

**Preformatted Text**

Use <pre> to preserve spaces and line breaks:

<pre>
  This text
    preserves    spaces
  and line breaks.
</pre>

---

**Summary**

• Use <p> for paragraphs
• Use <br> for line breaks within text
• Use <pre> to preserve formatting`
    },
    {
        topic: "HTML Styles",
        theory: `**What is the HTML Style Attribute?**

The style attribute is used to add inline CSS styles to HTML elements.

---

**Syntax**

<tagname style="property:value;">Content</tagname>

---

**Common Style Properties**

**1. Color** - Text color
<p style="color:red;">Red text</p>

**2. Background Color**
<p style="background-color:yellow;">Yellow background</p>

**3. Font Size**
<p style="font-size:24px;">Large text</p>

**4. Font Family**
<p style="font-family:Arial;">Arial font</p>

**5. Text Alignment**
<p style="text-align:center;">Centered text</p>

---

**Multiple Styles**

Combine styles with semicolons:

<p style="color:blue; font-size:20px; text-align:center;">Styled text</p>

---

**Better Approach**

While inline styles work, using CSS files is better for larger projects:
• Easier to maintain
• Reusable across pages
• Cleaner HTML code

---

**Summary**

• Use style attribute for quick styling
• Separate multiple properties with semicolons
• CSS files are better for larger projects`
    },
    {
        topic: "HTML Formatting",
        theory: `**HTML Text Formatting Elements**

HTML provides special elements for formatting text with semantic meaning.

---

**Bold and Strong**

<b>Bold text</b> - Visual bold only
<strong>Important text</strong> - Bold with importance

---

**Italic and Emphasis**

<i>Italic text</i> - Visual italic only
<em>Emphasized text</em> - Italic with emphasis

---

**Other Formatting Tags**

<mark>Highlighted text</mark>
<small>Smaller text</small>
<del>Deleted/strikethrough text</del>
<ins>Inserted/underlined text</ins>
<sub>Subscript</sub> - Like H₂O
<sup>Superscript</sup> - Like x²

---

**Example Usage**

<p>Water formula: H<sub>2</sub>O</p>
<p>Math: x<sup>2</sup> + y<sup>2</sup></p>
<p>Sale: <del>$100</del> <ins>$75</ins></p>

---

**Semantic vs Visual**

• <strong> and <em> are semantic (meaningful)
• <b> and <i> are purely visual
• Prefer semantic tags for accessibility

---

**Summary**

• Use <strong> for important text
• Use <em> for emphasized text
• Use semantic tags when meaning matters`
    },
    {
        topic: "HTML Comments",
        theory: `**What are HTML Comments?**

Comments are notes in your code that browsers ignore. They help you and other developers understand the code.

---

**Comment Syntax**

<!-- This is a comment -->

---

**Single Line Comment**

<!-- Navigation section starts here -->
<nav>...</nav>

---

**Multi-line Comments**

<!--
  This is a comment
  that spans multiple
  lines of code
-->

---

**Use Cases**

**1. Explain complex code**
<!-- Calculate user age from birthdate -->

**2. Mark sections**
<!-- HEADER -->
<!-- MAIN CONTENT -->
<!-- FOOTER -->

**3. Temporarily hide code**
<!-- <p>This paragraph is hidden</p> -->

**4. Leave reminders**
<!-- TODO: Add form validation -->

---

**Best Practices**

• Don't over-comment obvious code
• Keep comments up-to-date
• Use clear, concise language
• Remove debug comments before production

---

**Summary**

• Comments help document your code
• Syntax: <!-- comment text -->
• Browsers completely ignore comments`
    },
    {
        topic: "HTML Colors",
        theory: `**HTML Colors**

Colors in HTML can be specified using color names, RGB, HEX, or HSL values.

---

**Color Names**

HTML supports 140 standard color names:

<p style="color:red;">Red</p>
<p style="color:blue;">Blue</p>
<p style="color:tomato;">Tomato</p>

---

**HEX Colors**

Format: #RRGGBB (00-FF for each)

<p style="color:#ff0000;">Red</p>
<p style="color:#00ff00;">Green</p>
<p style="color:#0000ff;">Blue</p>

---

**RGB Colors**

Format: rgb(red, green, blue) - values 0-255

<p style="color:rgb(255,0,0);">Red</p>
<p style="color:rgb(0,255,0);">Green</p>
<p style="color:rgb(0,0,255);">Blue</p>

---

**RGBA - With Transparency**

<p style="background:rgba(255,0,0,0.5);">50% transparent red</p>

---

**Common Color Codes**

• Black: #000000
• White: #FFFFFF
• Red: #FF0000
• Green: #00FF00
• Blue: #0000FF
• Gray: #808080

---

**Summary**

• Use color names for quick styling
• HEX codes for precise colors
• RGBA when you need transparency`
    }
];

async function seedHtmlTopics() {
    try {
        console.log("🚀 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected!\n");

        let updated = 0;
        for (const topicData of htmlTopicsContent) {
            const existing = await Topic.findOne({ language: "HTML", topic: topicData.topic });
            if (existing) {
                existing.theory = topicData.theory;
                await existing.save();
                console.log(`✅ Updated: ${topicData.topic}`);
                updated++;
            }
        }
        console.log(`\n📊 Summary: ${updated} topics updated`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected.");
    }
}

seedHtmlTopics();
