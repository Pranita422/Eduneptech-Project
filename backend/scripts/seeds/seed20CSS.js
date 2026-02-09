const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const cssTopics = [
    {
        language: "CSS",
        topic: "Introduction to CSS",
        content: `**What is CSS?**
CSS (Cascading Style Sheets) is the language we use to style an HTML document. CSS describes how HTML elements should be displayed on screen, paper, or in other media.

**Why Use CSS?**
• **Save Time:** You can write CSS once and reuse the same sheet in multiple HTML pages.
• **Easy Maintenance:** To make a global change, simply change the style, and all elements in all web pages will be updated automatically.
• **Rich Features:** CSS allows for complex layouts, animations, and responsive designs that HTML alone cannot achieve.

**Basic Example:**
\`\`\`css
body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}
\`\`\`

---
**Note:** CSS3 is the latest version of CSS, introducing features like rounded corners, shadows, gradients, and flexbox/grid for layout management.`,
        slug: "introduction-to-css",
        order: 1
    },
    {
        language: "CSS",
        topic: "CSS Syntax and Selectors",
        content: `**CSS Rule Set**
A CSS rule-set consists of a selector and a declaration block.

**1. The Selector:**
The selector points to the HTML element you want to style.
**2. The Declaration Block:**
Contains one or more declarations separated by semicolons. Each declaration includes a CSS property name and a value, separated by a colon.

**Types of Basic Selectors:**
• **Element Selector:** Selects elements based on the element name (e.g., \`p { color: red; }\`).
• **ID Selector:** Uses the \`id\` attribute of an element to select a specific element. Use \`#\` followed by the ID (e.g., \`#para1 { color: blue; }\`).
• **Class Selector:** Selects elements with a specific class attribute. Use \`.\` followed by the class name (e.g., \`.center { text-align: center; }\`).
• **Universal Selector:** The \`*\` selector selects all HTML elements on the page.
• **Grouping Selector:** Groups selectors to minimize code (e.g., \`h1, h2, p { text-align: center; }\`).

---
**Tip:** ID names must be unique within a page, while class names can be used on multiple elements.`,
        slug: "css-syntax-selectors",
        order: 2
    },
    {
        language: "CSS",
        topic: "How To Add CSS",
        content: `**Three Ways to Insert CSS**
There are three ways of inserting a style sheet into an HTML document.

**1. External CSS:**
With an external style sheet, you can change the look of an entire website by changing just one file!
\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`

**2. Internal CSS:**
Used if one single HTML page has a unique style. Defined inside the \`<style>\` element, within the \`<head>\` section.
\`\`\`html
<style>
  body { background-color: linen; }
</style>
\`\`\`

**3. Inline CSS:**
Used to apply a unique style for a single element. Add the \`style\` attribute to the relevant element.
\`\`\`html
<h1 style="color:blue;">A Blue Heading</h1>
\`\`\`

---
**Cascading Order:** Inline style has the highest priority, followed by Internal/External styles, and finally browser defaults.`,
        slug: "how-to-add-css",
        order: 3
    },
    {
        language: "CSS",
        topic: "CSS Colors and Backgrounds",
        content: `**Styling with Colors and Backgrounds**
CSS brings life to your web pages through vibrant colors and background images.

**Colors:**
Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.
• **HEX:** \`#ff0000\`
• **RGB:** \`rgb(255, 0, 0)\`
• **RGBA:** \`rgba(255, 0, 0, 0.5)\` (Includes transparency)

**Background Properties:**
• **background-color:** Sets the background color of an element.
• **background-image:** Sets an image as the background.
• **background-repeat:** Sets if/how a background image will be repeated.
• **background-size:** Specifies the size of the background images (e.g., \`cover\`, \`contain\`).
• **background-position:** Sets the starting position of a background image.

**Example:**
\`\`\`css
body {
  background-image: url("paper.gif");
  background-repeat: no-repeat;
  background-position: right top;
}
\`\`\``,
        slug: "css-colors-backgrounds",
        order: 4
    },
    {
        language: "CSS",
        topic: "CSS Box Model",
        content: `**Understanding the Box Model**
All HTML elements can be considered as boxes. In CSS, the term "box model" is used when talking about design and layout.

**Components of the Box Model:**
1. **Content:** The content of the box, where text and images appear.
2. **Padding:** Clears an area around the content. The padding is transparent.
3. **Border:** A border that goes around the padding and content.
4. **Margin:** Clears an area outside the border. The margin is transparent.

**Visualization:**
\`\`\`text
[ Margin ]
  [ Border ]
    [ Padding ]
      [ Content ]
\`\`\`

**Total Width Calculation:**
Total element width = width + left padding + right padding + left border + right border + left margin + right margin.

---
**Tip:** Use \`box-sizing: border-box;\` to include padding and border in the element's total width and height.`,
        slug: "css-box-model",
        order: 5
    },
    {
        language: "CSS",
        topic: "CSS Margins and Padding",
        content: `**Spacing: Margins vs Padding**

**1. CSS Margins:**
Margins are used to create space around elements, outside of any defined borders.
• **margin-top, -right, -bottom, -left**
• **Shorthand:** \`margin: 25px 50px 75px 100px;\` (top, right, bottom, left)

**2. CSS Padding:**
Padding is used to create space around an element's content, inside of any defined borders.
• **padding-top, -right, -bottom, -left**
• **Shorthand:** \`padding: 25px 50px;\` (top/bottom, left/right)

**Key Differences:**
• **Margin** is space outside the element; **Padding** is space inside the element.
• **Background colors** show in the padding but NOT in the margin.
• **Margin-collapsing:** Top and bottom margins of elements are sometimes collapsed into a single margin.`,
        slug: "css-margins-padding",
        order: 6
    },
    {
        language: "CSS",
        topic: "CSS Height and Width",
        content: `**Dimesioning Elements**
The \`height\` and \`width\` properties are used to set the height and width of an element.

**Values:**
• **auto:** This is default. The browser calculates the height and width.
• **length:** Defines the height/width in px, cm, etc.
• **%:** Defines the height/width in percent of the containing block.

**Max-width Property:**
The \`max-width\` property is used to set the maximum width of an element. It is better than \`width\` when dealing with small browser windows.
\`\`\`css
div {
  max-width: 500px;
  height: 100px;
  background-color: powderblue;
}
\`\`\`

---
**Note:** Height and width do not include padding, borders, or margins by default. Use \`box-sizing: border-box;\` to change this.`,
        slug: "css-height-width",
        order: 7
    },
    {
        language: "CSS",
        topic: "CSS Text and Fonts",
        content: `**Typography in CSS**
CSS has many properties for formatting text and choosing fonts.

**Text Properties:**
• **color:** Sets the color of the text.
• **text-align:** Sets the horizontal alignment (\`left\`, \`right\`, \`center\`, \`justify\`).
• **text-decoration:** Used to add/remove decorations (\`none\`, \`underline\`).
• **text-transform:** Controls the capitalization (\`uppercase\`, \`lowercase\`, \`capitalize\`).

**Font Properties:**
• **font-family:** Specifies the font for an element (always provide fallbacks like \`serif\`, \`sans-serif\`).
• **font-size:** Sets the size of the font (\`px\`, \`em\`, \`rem\`, \`%\`).
• **font-weight:** Sets how thick or thin characters should be (\`normal\`, \`bold\`).
• **font-style:** Mostly used to specify italic text.

---
**Best Practice:** Use \`rem\` units for font sizes to ensure accessibility and responsive scaling based on user browser settings.`,
        slug: "css-text-fonts",
        order: 8
    },
    {
        language: "CSS",
        topic: "CSS Icons and Links",
        content: `**Hyperlinks and Visual Icons**

**Styling Links:**
Links can be styled with any CSS property (e.g., color, font-family, background).
In addition, links can be styled differently depending on what **state** they are in:
• **a:link:** A normal, unvisited link.
• **a:visited:** A link the user has visited.
• **a:hover:** A link when the user mouses over it.
• **a:active:** A link the moment it is clicked.

**Example:**
\`\`\`css
a:hover {
  color: hotpink;
  text-decoration: underline;
}
\`\`\`

**CSS Icons:**
The easiest way to add icons to your HTML page is with an icon library, such as **Font Awesome**, **Google Icons**, or **Bootstrap Icons**.
\`\`\`html
<i class="fa fa-cloud"></i>
<i class="material-icons">cloud</i>
\`\`\``,
        slug: "css-icons-links",
        order: 9
    },
    {
        language: "CSS",
        topic: "CSS Lists and Tables",
        content: `**Styling Data Collections**

**CSS Lists:**
• **list-style-type:** Sets the shape of the marker (\`circle\`, \`square\`, \`upper-roman\`).
• **list-style-image:** Sets an image as the list item marker.
• **list-style-position:** Specifies if the markers should appear inside or outside the content flow.

**CSS Tables:**
• **border:** Defines the border for table, th, and td.
• **border-collapse:** Collapses double borders into a single border.
• **padding:** Adds space between the content and the border.
• **nth-child():** Used to create zebra-striped tables.

**Example Table Style:**
\`\`\`css
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
\`\`\``,
        slug: "css-lists-tables",
        order: 10
    },
    {
        language: "CSS",
        topic: "CSS Layout - Display",
        content: `**The Display Property**
The \`display\` property is the most important CSS property for controlling layout. It specifies how an element is displayed.

**Common Values:**
• **block:** Displays as a block element (starts on a new line and takes up the full width). Examples: \`<div>\`, \`<h1>\`, \`<p>\`.
• **inline:** Displays as an inline element (does not start on a new line and only takes as much width as necessary). Example: \`<span>\`, \`<a>\`.
• **none:** The element is removed from the layout. It will not take up any space.
• **inline-block:** Like inline, but you can set width and height values.

**Changing Display:**
You can change an inline element into a block element, and vice versa.
\`\`\`css
li {
  display: inline;
}
\`\`\`

---
**Note:** Hiding an element with \`display: none;\` is different from \`visibility: hidden;\`. The latter hides it but still takes up space in the layout!`,
        slug: "css-layout-display",
        order: 11
    },
    {
        language: "CSS",
        topic: "CSS Layout - Max-width",
        content: `**Flexible Sizing with Max-width**
As mentioned before, a \`<div>\` is a block-level element, so it will always take up the full width available.

**The Problem with Fixed Width:**
If you set \`width: 500px;\`, the element will always stay at 500px, even if the screen is smaller (like on a phone), causing a horizontal scrollbar.

**The Solution:**
Use \`max-width\` instead!
\`\`\`css
div.ex {
  max-width: 500px;
  margin: auto;
  border: 3px solid #73AD21;
}
\`\`\`
In the example above, the div will be 500px if space permits, but if the window is smaller, the div will adapt to 100% width automatically.

---
**Tip:** Setting \`margin: auto;\` on a fixed or max-width element will horizontally center it within its container.`,
        slug: "css-layout-max-width",
        order: 12
    },
    {
        language: "CSS",
        topic: "CSS Layout - Position",
        content: `**Positioning Elements**
The \`position\` property specifies the type of positioning method used for an element.

**Five Position Values:**
1. **static:** Default. Follows the normal page flow.
2. **relative:** Positioned relative to its normal position. Using \`top/right/bottom/left\` will move it but NOT affect other elements.
3. **fixed:** Positioned relative to the viewport. It stays in the same place even when scrolled.
4. **absolute:** Positioned relative to the nearest positioned ancestor (instead of relative to the viewport, like fixed).
5. **sticky:** Positioned based on the user's scroll position. It toggles between \`relative\` and \`fixed\`.

**Example absolute:**
\`\`\`css
.parent { position: relative; }
.child { position: absolute; top: 0; right: 0; }
\`\`\`

---
**Note:** Elements are only "positioned" if they have a position other than \`static\`.`,
        slug: "css-layout-position",
        order: 13
    },
    {
        language: "CSS",
        topic: "CSS Layout - Overflow",
        content: `**Handling Content Overflow**
The \`overflow\` property specifies whether to clip content or to add scrollbars when the content of an element is too big to fit in a specified area.

**Values:**
• **visible:** Default. Content is not clipped and renders outside the element's box.
• **hidden:** Content is clipped, and the rest of the content will be invisible.
• **scroll:** Content is clipped, but a scrollbar is added to see the rest of the content.
• **auto:** Similar to scroll, but it adds scrollbars only when necessary.

**Example:**
\`\`\`css
div {
  width: 200px;
  height: 50px;
  background-color: #eee;
  overflow: auto;
}
\`\`\`

---
**Tip:** You can handle horizontal and vertical overflow separately using \`overflow-x\` and \`overflow-y\`.`,
        slug: "css-layout-overflow",
        order: 14
    },
    {
        language: "CSS",
        topic: "CSS Float and Clear",
        content: `**Legacy Layout: Float and Clear**
While modern layouts use Flexbox and Grid, \`float\` is still used for wrapping text around images.

**The Float Property:**
Specifies how an element should float.
• \`float: left;\`
• \`float: right;\`

**The Clear Property:**
Specifies what elements can float beside the cleared element and on which side. Used after a float to "reset" the layout.
\`\`\`css
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
\`\`\`

---
**Technical Note:** Floated elements are removed from the normal flow of the page, which can cause parent containers to "collapse" (have 0 height if all children are floated). This is where the "clearfix" hack comes in.`,
        slug: "css-float-clear",
        order: 15
    },
    {
        language: "CSS",
        topic: "CSS Combinators",
        content: `**Relationship-based Selectors**
A combinator is something that explains the relationship between selectors.

**C++ CSS Combinators:**
1. **Descendant Selector (space):** Matches all elements that are descendants of a specified element.
   Example: \`div p { ... }\` (Styles all \`<p>\` inside a \`<div>\`).
2. **Child Selector (>):** Matches all elements that are children of a specified element.
   Example: \`div > p { ... }\` (Styles only direct children).
3. **Adjacent Sibling Selector (+):** Matches an element that is directly after a specific element.
   Example: \`div + p { ... }\` (Styles the first \`<p>\` after a \`<div>\`).
4. **General Sibling Selector (~):** Matches all elements that are next siblings of a specified element.
   Example: \`div ~ p { ... }\` (Styles all \`<p>\` that follow a \`<div>\`).`,
        slug: "css-combinators",
        order: 16
    },
    {
        language: "CSS",
        topic: "CSS Pseudo-classes and Elements",
        content: `**Advanced Selector States**

**Pseudo-classes:**
A pseudo-class is used to define a special state of an element ($:state$).
• \`:hover\`: When mouse over.
• \`:first-child\`: The first child of a parent.
• \`:nth-child(n)\`: The n-th child of a parent.
• \`:focus\`: When an input has focus.

**Pseudo-elements:**
A pseudo-element is used to style specific parts of an element ($::part$).
• \`::before\`: Insert content before the element content.
• \`::after\`: Insert content after the element content.
• \`::first-line\`: Style the first line of text.
• \`::selection\`: Style the part of an element that is selected by a user.

**Example:**
\`\`\`css
p::first-letter {
  color: #ff0000;
  font-size: xx-large;
}
\`\`\``,
        slug: "css-pseudo",
        order: 17
    },
    {
        language: "CSS",
        topic: "CSS Flexbox",
        content: `**Modern Layout: Flexbox**
Flexbox makes it easier to design flexible responsive layout structure without using float or positioning.

**The Flex Container (Parent):**
To use Flexbox, you must set \`display: flex;\` on the parent container.
• **flex-direction:** \`row\` | \`column\`
• **justify-content:** Aligns items horizontally (\`center\`, \`space-between\`, \`flex-start\`).
• **align-items:** Aligns items vertically.
• **flex-wrap:** Specifies whether the flex items should wrap or not.

**The Flex Items (Children):**
• **flex-grow:** Defines how much an item will grow relative to others.
• **flex-shrink:** Defines how much an item will shrink.
• **flex-basis:** Defines the initial size of an item.

**Shorthand:** \`flex: grow shrink basis;\` (e.g., \`flex: 1;\`).`,
        slug: "css-flexbox",
        order: 18
    },
    {
        language: "CSS",
        topic: "CSS Grid Layout",
        content: `**Two-Dimensional Grid Layout**
CSS Grid Layout offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.

**Grid Container Properties:**
• **display: grid;**
• **grid-template-columns:** Defines the number and width of columns. Supports \`fr\` unit (fractional).
• **grid-template-rows:** Defines the height of rows.
• **gap:** Defines the space between rows and columns.

**Grid Item Properties:**
• **grid-column:** Specifies where to start and end a grid item (\`grid-column: 1 / 3;\`).
• **grid-row:** Specifies the row start and end.

**Example Grid:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
\`\`\``,
        slug: "css-grid",
        order: 19
    },
    {
        language: "CSS",
        topic: "CSS Media Queries",
        content: `**Responsive Web Design**
Media queries are a popular technique for delivering a tailored style sheet to different devices.

**Syntax:**
\`\`\`css
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
  .column {
    width: 100%;
  }
}
\`\`\`

**Breakpoints:**
Breakpoints are the "trigger points" where a media query is applied.
• **Mobile:** Up to 480px
• **Tablets:** 481px - 768px
• **Laptops/Desktops:** 769px and above

---
**Strategy:** "Mobile-first" design means you write code for mobile by default and use media queries to add complexity for larger screens.`,
        slug: "css-media-queries",
        order: 20
    }
];

const seedCSS = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for 20 CSS topics seeding (GFG Style)...");

        // Remove old CSS topics to ensure exactly 20
        await Topic.deleteMany({ language: "CSS" });
        console.log("Cleared existing CSS topics.");

        await Topic.insertMany(cssTopics);
        console.log("Successfully seeded 20 detailed CSS topics!");

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedCSS();
