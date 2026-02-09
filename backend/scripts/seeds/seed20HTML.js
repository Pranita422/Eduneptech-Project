const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const htmlTopics = [
    {
        language: "HTML",
        topic: "Introduction to HTML",
        content: `**What is HTML?**
HTML stands for HyperText Markup Language. It is the standard markup language used to create web pages. It describes the structure of a webpage and consists of a series of elements which tell the browser how to display the content.

**Key Features of HTML:**
• **Platform Independent:** HTML documents can be viewed on any platform (Windows, Linux, macOS).
• **Static Language:** By itself, HTML creates static pages.
• **Case Insensitive:** HTML tags can be written in both uppercase and lowercase (though lowercase is recommended).

**Basic Structure of an HTML Page:**
Every HTML document has a basic structure:
\`\`\`
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

---
**Note:** The \`<!DOCTYPE html>\` declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.`,
        slug: "introduction-to-html",
        order: 1
    },
    {
        language: "HTML",
        topic: "HTML Editors",
        content: `**Writing HTML with a Simple Text Editor**
Web pages can be created and modified by using professional HTML editors. However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).

**Steps to Create Your First HTML Page:**
1. **Open Notepad (PC) or TextEdit (Mac).**
2. **Write some HTML code.**
3. **Save the HTML Page:** Save the file on your computer with a .html or .htm extension (e.g., "index.html").
4. **View the HTML Page in Your Browser:** Open the saved HTML file in your favorite browser.

**Popular Professional Editors:**
- **Visual Studio Code:** Highly popular, free, and open-source.
- **Sublime Text:** Lightweight and fast.
- **Atom:** A hackable text editor.`,
        slug: "html-editors",
        order: 2
    },
    {
        language: "HTML",
        topic: "HTML Basic Examples",
        content: `**HTML Documents**
All HTML documents must start with a document type declaration: \`<!DOCTYPE html>\`.
The HTML document itself begins with \`<html>\` and ends with \`</html>\`.
The visible part of the HTML document is between \`<body>\` and \`</body>\`.

**HTML Headings:**
HTML headings are defined with the \`<h1>\` to \`<h6>\` tags.
\`\`\`
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
\`\`\`

**HTML Paragraphs:**
HTML paragraphs are defined with the \`<p>\` tag.
\`\`\`
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
\`\`\`

**HTML Links:**
HTML links are defined with the \`<a>\` tag.
\`\`\`
<a href="https://www.google.com">This is a link</a>
\`\`\``,
        slug: "html-basic-examples",
        order: 3
    },
    {
        language: "HTML",
        topic: "HTML Elements",
        content: `**What is an HTML Element?**
An HTML element is defined by a start tag, some content, and an end tag.

**Syntax:**
\`<tagname> Content goes here... </tagname>\`

**Examples of HTML Elements:**
- \`<h1>My First Heading</h1>\`
- \`<p>My first paragraph.</p>\`
- \`<br>\` (Empty element, has no content and no end tag)

**Nested HTML Elements:**
Elements can be nested (elements can contain elements). All HTML documents consist of nested HTML elements.

**Example of Nested Elements:**
\`\`\`
<html>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
\`\`\`

---
**Important Tip:** Never skip the end tag. Some HTML elements will display correctly even if you forget the end tag, but this is not recommended as it may lead to errors.`,
        slug: "html-elements",
        order: 4
    },
    {
        language: "HTML",
        topic: "HTML Attributes",
        content: `**What are HTML Attributes?**
Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like \`name="value"\`.

**Common Attributes:**
- **The href Attribute:** Used with \`<a>\` to specify the URL of the page the link goes to.
- **The src Attribute:** Used with \`<img>\` to specify the path to the image to be displayed.
- **The width and height Attributes:** Used with \`<img>\` to provide size information for images.
- **The alt Attribute:** Used with \`<img>\` to provide alternative text if an image cannot be displayed.
- **The style Attribute:** Used to add styles to an element, such as color, font, size, etc.
- **The lang Attribute:** Used inside the \`<html>\` tag to declare the language of the Web page.

**Example:**
\`\`\`
<a href="https://www.google.com">Visit Google</a>
<img src="img_girl.jpg" width="500" height="600" alt="Girl in a jacket">
\`\`\`

---
**Best Practice:** Always use lowercase attributes and always quote attribute values.`,
        slug: "html-attributes",
        order: 5
    },
    {
        language: "HTML",
        topic: "HTML Headings",
        content: `**HTML Headings (h1 to h6)**
Headings are used to define the hierarchy and structure of your content. HTML defines six levels of headings.

**Hierarchy:**
- \`<h1>\`: The most important heading. Usually used for the main title of the page.
- \`<h2>\`: Second level heading, used for major sections.
- \`<h3>\` to \`<h6>\`: Used for sub-sections within main sections.

**Example:**
\`\`\`
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<h3>Detailed Heading</h3>
\`\`\`

**Why Headings are Important?**
1. **Search Engines:** Use headings to index the structure and content of your web pages.
2. **Users:** Skim your pages by headings. It is important to use headings to show the document structure.
3. **Accessibility:** Screen readers use headings to help visually impaired users navigate the page.

---
**Note:** Use HTML headings for headings only. Do not use headings to make text BIG or bold.`,
        slug: "html-headings",
        order: 6
    },
    {
        language: "HTML",
        topic: "HTML Paragraphs",
        content: `**The HTML <p> Element**
The HTML \`<p>\` element defines a paragraph. A paragraph always starts on a new line, and browsers automatically add some white space (a margin) before and after a paragraph.

**Displaying Paragraphs:**
You cannot be sure how HTML will be displayed. Large or small screens, and resized windows will create different results. With HTML, you cannot change the display by adding extra spaces or extra lines in your HTML code.

**HTML Display Rules:**
- The browser will automatically remove any extra spaces and lines when the page is displayed.
- Any number of spaces or new lines will be treated as a single space.

**Example:**
\`\`\`
<p>
This paragraph
contains a lot of lines
in the source code,
but the browser
ignores it.
</p>
\`\`\`

**The <br> Tag:**
If you want a line break (a new line) without starting a new paragraph, use the \`<br>\` tag.

**The <pre> Element:**
The HTML \`<pre>\` element defines preformatted text. The text inside a \`<pre>\` element is displayed in a fixed-width font, and it preserves both spaces and line breaks.`,
        slug: "html-paragraphs",
        order: 7
    },
    {
        language: "HTML",
        topic: "HTML Styles",
        content: `**The HTML Style Attribute**
Setting the style of an HTML element can be done with the style attribute. The HTML style attribute has the following syntax:

**Syntax:**
\`<tagname style="property:value;">\`

**Common Style Properties:**
- **background-color:** Defines the background color for an element.
- **color:** Defines the text color for an HTML element.
- **font-family:** Defines the font to be used for an HTML element.
- **font-size:** Defines the text size for an HTML element.
- **text-align:** Defines the horizontal text alignment for an HTML element.

**Example:**
\`\`\`
<body style="background-color:powderblue;">
<h1 style="color:blue;">This is a heading</h1>
<p style="color:red; font-family:courier; font-size:160%;">This is a paragraph.</p>
<p style="text-align:center;">Centered paragraph.</p>
</body>
\`\`\``,
        slug: "html-styles",
        order: 8
    },
    {
        language: "HTML",
        topic: "HTML Formatting",
        content: `**HTML Text Formatting**
HTML contains several elements for defining text with a special meaning.

**Formatting Elements:**
- \`<b>\`: Bold text
- \`<strong>\`: Important text (similar to bold, but with semantic meaning)
- \`<i>\`: Italic text
- \`<em>\`: Emphasized text (similar to italic, but with semantic meaning)
- \`<mark>\`: Marked text (highlighted)
- \`<small>\`: Smaller text
- \`<del>\`: Deleted text (strikethrough)
- \`<ins>\`: Inserted text (underlined)
- \`<sub>\`: Subscript text
- \`<sup>\`: Superscript text

**Example:**
\`\`\`
<p>This is <b>bold</b> text.</p>
<p>This is <i>italic</i> text.</p>
<p>This is <sub>subscript</sub> and <sup>superscript</sup> text.</p>
\`\`\``,
        slug: "html-formatting",
        order: 9
    },
    {
        language: "HTML",
        topic: "HTML Quotations",
        content: `**HTML Quotation and Citation Elements**
HTML provides several elements to handle quotations from other sources.

**1. <blockquote> for Long Quotations:**
The HTML \`<blockquote>\` element defines a section that is quoted from another source. Browsers usually indent \`<blockquote>\` elements.
\`\`\`
<blockquote cite="http://www.worldwildlife.org/">
For 50 years, WWF has been protecting the future of nature.
</blockquote>
\`\`\`

**2. <q> for Short Inline Quotations:**
The HTML \`<q>\` tag defines a short inline quotation. Browsers normally insert quotation marks around the quotation.

**3. <abbr> for Abbreviations:**
The HTML \`<abbr>\` tag defines an abbreviation or an acronym. Marking abbreviations can give useful information to browsers and search engines.

**4. <address> for Contact Information:**
The HTML \`<address>\` tag defines the contact information for the author/owner of a document or an article.`,
        slug: "html-quotations",
        order: 10
    },
    {
        language: "HTML",
        topic: "HTML Comments",
        content: `**Comment Tags in HTML**
HTML comments are not displayed in the browser, but they can help document your HTML source code. You can use comments to explain your code, which can help when you edit the source code at a later date.

**Syntax:**
\`<!-- Write your comments here -->\`

**Using Comments:**
- **Add Notifications:** \`<!-- This is a comment -->\`
- **Hide Content Temporarily:** You can hide more than one line:
\`\`\`
<!--
<p>This paragraph is hidden.</p>
<p>So is this one.</p>
-->
\`\`\`
- **Hide Inline Content:** \` <p>This is <!-- a hidden word --> a paragraph.</p>\`

---
**Caution:** Do not put sensitive information (like passwords) in HTML comments, as they are visible to anyone who views the page source.`,
        slug: "html-comments",
        order: 11
    },
    {
        language: "HTML",
        topic: "HTML Colors",
        content: `**Color Specification in HTML**
HTML colors are specified with predefined color names, or with RGB, HEX, HSL, RGBA, or HSLA values.

**Color Names:**
HTML supports 140 standard color names (Tomato, Orange, DodgerBlue, MediumSeaGreen, Gray, SlateBlue, Violet, LightGray, etc.)

**Background Color:**
You can set the background color for HTML elements:
\`<h1 style="background-color:DodgerBlue;">Hello World</h1>\`

**Text Color:**
You can set the color of text:
\`<p style="color:Tomato;">Tomato text color</p>\`

**Border Color:**
You can set the color of borders:
\`<h1 style="border:2px solid Tomato;">Hello World</h1>\`

**Color Values:**
- **RGB:** \`rgb(255, 99, 71)\`
- **HEX:** \`#ff6347\`
- **HSL:** \`hsl(9, 100%, 64%)\`
- **RGBA/HSLA:** Extensions with Alpha channel for transparency.`,
        slug: "html-colors",
        order: 12
    },
    {
        language: "HTML",
        topic: "HTML CSS",
        content: `**Styling HTML with CSS**
CSS stands for Cascading Style Sheets. It describes how HTML elements are to be displayed on screen, paper, or in other media.

**Three Ways to Add CSS:**
1. **Inline CSS:** Used to apply a unique style to a single HTML element. Uses the \`style\` attribute.
   \`<h1 style="color:blue;">A Blue Heading</h1>\`
2. **Internal CSS:** Used to define a style for a single HTML page. It is defined in the \`<head>\` section, within a \`<style>\` element.
   \`\`\`
   <head>
   <style>
   body {background-color: powderblue;}
   h1   {color: blue;}
   </style>
   </head>
   \`\`\`
3. **External CSS:** Used to define the style for many HTML pages. With an external style sheet, you can change the look of an entire web site by changing one file! To use an external style sheet, add a link to it in the \`<head>\` section.
   \`<link rel="stylesheet" href="styles.css">\`

---
**Tip:** The most common way to add CSS is to keep the styles in external CSS files.`,
        slug: "html-css",
        order: 13
    },
    {
        language: "HTML",
        topic: "HTML Links",
        content: `**HTML Hyperlinks**
Links are found in nearly all web pages. Links allow users to click their way from page to page.

**Syntax:**
\`<a href="url">link text</a>\`

**Target Attribute:**
By default, the linked page will be displayed in the current browser window. To change this, you must specify another target for the link:
- **_self:** Default. Opens the document in the same window/tab.
- **_blank:** Opens the document in a new window or tab.
- **_parent:** Opens the document in the parent frame.
- **_top:** Opens the document in the full body of the window.

**Example:**
\`<a href="https://www.google.com" target="_blank">Visit Google!</a>\`

**Absolute vs. Relative URLs:**
- **Absolute URL:** A full web address (e.g., https://www.google.com).
- **Relative URL:** A local link (e.g., "contact.html").

**Link as Image:**
\`<a href="default.asp"><img src="smiley.gif" alt="HTML tutorial"></a>\``,
        slug: "html-links",
        order: 14
    },
    {
        language: "HTML",
        topic: "HTML Images",
        content: `**Using Images in HTML**
Images can improve the design and the appearance of a web page.

**Syntax:**
\`<img src="url" alt="alternatetext">\`

**Required Attributes:**
- **src:** Specifies the path to the image.
- **alt:** Provides an alternate text for an image, if the user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

**Image Size (Width and Height):**
You can use the style attribute to specify the width and height of an image or use the width/height attributes.
\`<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">\`

**Images on Another Server:**
\`<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">\`

**Animated Images (GIFs):**
HTML allows animated GIFs.
\`<img src="programming.gif" alt="Computerman">\`

---
**Tip:** Always specify the width and height of an image. If width and height are not specified, the page might flicker while the image loads.`,
        slug: "html-images",
        order: 15
    },
    {
        language: "HTML",
        topic: "HTML Tables",
        content: `**HTML Tables**
HTML tables allow web developers to arrange data into rows and columns.

**Basic Table Structure:**
- \`<table>\`: Defines the table.
- \`<tr>\`: Defines a table row.
- \`<th>\`: Defines a table header (centered and bold by default).
- \`<td>\`: Defines a table cell (data).

**Example:**
\`\`\`
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
</table>
\`\`\`

**Additional Features:**
- **Table Borders:** Can be added using CSS.
- **Cell Padding & Spacing:** Controlled via CSS.
- **Colspan & Rowspan:** Used to make a cell span more than one column or row.
  \`<th colspan="2">Name</th>\``,
        slug: "html-tables",
        order: 16
    },
    {
        language: "HTML",
        topic: "HTML Lists",
        content: `**Unordered and Ordered Lists**
HTML lists allow web developers to group a set of related items in lists.

**1. Unordered HTML List:**
An unordered list starts with the \`<ul>\` tag. Each list item starts with the \`<li>\` tag. The list items will be marked with bullets (small black circles) by default.
\`\`\`
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
\`\`\`

**2. Ordered HTML List:**
An ordered list starts with the \`<ol>\` tag. Each list item starts with the \`<li>\` tag. The list items will be marked with numbers by default.
\`\`\`
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
\`\`\`

**3. Description Lists:**
A description list is a list of terms, with a description of each term.
- \`<dl>\`: Defines the description list.
- \`<dt>\`: Defines the term (name).
- \`<dd>\`: Describes each term.`,
        slug: "html-lists",
        order: 17
    },
    {
        language: "HTML",
        topic: "HTML Block & Inline",
        content: `**Block-level and Inline Elements**
Every HTML element has a default display value, depending on what type of element it is.

**Block-level Elements:**
A block-level element always starts on a new line, and the browsers automatically add some space (a margin) before and after the element. A block-level element always takes up the full width available.
- **Examples:** \`<div>\`, \`<h1>-<h6>\`, \`<p>\`, \`<ul>\`, \`<li>\`, \`<section>\`, \`<header>\`, \`<footer>\`.

**Inline Elements:**
An inline element does not start on a new line. An inline element only takes up as much width as necessary.
- **Examples:** \`<span>\`, \`<a>\`, \`<img>\`, \`<strong>\`, \`<em>\`, \`<input>\`.

**The <div> Element:**
The \`<div>\` element is often used as a container for other HTML elements. It has no required attributes, but \`style\`, \`class\`, and \`id\` are common.

**The <span> Element:**
The \`<span>\` element is an inline container used to mark up a part of a text, or a part of a document.`,
        slug: "html-block-inline",
        order: 18
    },
    {
        language: "HTML",
        topic: "HTML Classes",
        content: `**The HTML Class Attribute**
The HTML \`class\` attribute is used to specify a class for an HTML element. Multiple HTML elements can share the same class.

**Usage:**
The class attribute is often used to point to a class name in a style sheet. It can also be used by JavaScript to access and manipulate elements with the specific class name.

**Example for Styling:**
\`\`\`
<head>
<style>
  .city {
    background-color: tomato;
    color: white;
    padding: 10px;
  }
</style>
</head>
<body>
  <div class="city">London</div>
  <div class="city">Paris</div>
</body>
\`\`\`

**Multiple Classes:**
HTML elements can belong to more than one class.
\`<h2 class="city main">London</h2>\`

---
**Tip:** Different HTML elements can use the same class. An \`<h1>\` and a \`<p>\` can both have the same class name.`,
        slug: "html-classes",
        order: 19
    },
    {
        language: "HTML",
        topic: "HTML Id",
        content: `**The HTML Id Attribute**
The HTML \`id\` attribute is used to specify a unique id for an HTML element. You cannot have more than one element with the same id in an HTML document.

**Usage:**
The \`id\` attribute specifies a unique id for an HTML element. The value of the id attribute must be unique within the HTML document. It is used to point to a specific style declaration in a style sheet and by JavaScript to manipulate the element with the specific id.

**Syntax for CSS:**
To select an element with a specific id, write a hash (#) character, followed by the id of the element.
\`\`\`
<style>
#myHeader {
  background-color: lightblue;
  color: black;
  padding: 40px;
  text-align: center;
}
</style>

<h1 id="myHeader">My Header</h1>
\`\`\`

**Difference Between Class and ID:**
- A class name can be used by multiple HTML elements.
- An ID name must only be used by one HTML element within the page.

**HTML Bookmarks:**
HTML bookmarks are used to allow readers to jump to specific parts of a webpage.
1. Create a bookmark with an ID: \`<h2 id="C4">Chapter 4</h2>\`
2. Create a link to the bookmark from the same page: \`<a href="#C4">Jump to Chapter 4</a>\``,
        slug: "html-id",
        order: 20
    }
];

const seedHTML = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for 20 HTML topics seeding (GFG Style)...");

        // Remove old HTML topics to ensure exactly 20
        await Topic.deleteMany({ language: "HTML" });
        console.log("Cleared existing HTML topics.");

        await Topic.insertMany(htmlTopics);
        console.log("Successfully seeded 20 detailed HTML topics!");

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedHTML();
