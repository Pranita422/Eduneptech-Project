const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const jsTopics = [
    {
        language: "JavaScript",
        topic: "Introduction to JavaScript",
        content: `**What is JavaScript?**
JavaScript is a versatile, high-level, interpreted programming language that is a core technology of the World Wide Web, alongside HTML and CSS. It allows you to implement complex features on web pages, such as interactive maps, animated graphics, and interactive forms.

**Why Study JavaScript?**
• **Standard Language of the Web:** Every modern browser supports it.
• **Full Stack Development:** With Node.js, you can use JavaScript on the server too.
• **Huge Ecosystem:** Millions of libraries and frameworks (React, Vue, Angular).

**Example Code:**
\`\`\`javascript
console.log("Hello, World!");
// Output: Hello, World!
\`\`\`

---
**Note:** JavaScript is not the same as Java. They are different languages with different syntax and use cases.`,
        slug: "introduction-to-javascript",
        order: 1
    },
    {
        language: "JavaScript",
        topic: "JavaScript Placement",
        content: `**Where to Add JavaScript?**
JavaScript can be added to an HTML document in two ways:

**1. Internal JavaScript:**
You can write JavaScript code directly inside a \`<script>\` tag in the HTML file, either in the \`<head>\` or \`<body>\` section.
\`\`\`html
<script>
  function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
  }
</script>
\`\`\`

**2. External JavaScript:**
You can write code in a separate file (e.g., \`script.js\`) and link it using the \`src\` attribute.
\`\`\`html
<script src="script.js"></script>
\`\`\`

**Best Practice:** Place scripts at the bottom of the \`<body>\` to allow HTML content to load faster.`,
        slug: "javascript-placement",
        order: 2
    },
    {
        language: "JavaScript",
        topic: "JavaScript Output",
        content: `**Displaying Data in JavaScript**
JavaScript provides several ways to "display" data:

**1. Writing into an HTML element (innerHTML):**
\`\`\`javascript
document.getElementById("demo").innerHTML = 5 + 6;
\`\`\`

**2. Writing into the browser console (console.log):**
\`\`\`javascript
console.log("Hello Console!");
\`\`\`

**3. Writing into an alert box (window.alert):**
\`\`\`javascript
window.alert("Alert Message");
\`\`\`

**4. Writing into the HTML output (document.write):**
**Caution:** Using \`document.write()\` after an HTML document is loaded, will delete all existing HTML.`,
        slug: "javascript-output",
        order: 3
    },
    {
        language: "JavaScript",
        topic: "JavaScript Statements",
        content: `**What is a JavaScript Statement?**
In a programming language, reusable blocks of code are called statements. JavaScript programs consist of instructions that are executed by a computer.

**Key Components:**
• **Values:** Literals (fixed) and Variables (variable).
• **Operators:** Used to assign or calculate values (+, -, *, /).
• **Keywords:** Special words that perform actions (let, function, return).

**Example:**
\`\`\`javascript
let x, y, z;    // Statement 1
x = 5;          // Statement 2
y = 6;          // Statement 3
z = x + y;      // Statement 4
\`\`\`

---
**Tip:** Semicolons separate JavaScript statements. It is common practice to end statements with a semicolon.`,
        slug: "javascript-statements",
        order: 4
    },
    {
        language: "JavaScript",
        topic: "JavaScript Syntax",
        content: `**Syntax Rules of JavaScript**
JavaScript syntax is the set of rules, how JavaScript programs are constructed.

**1. Fixed Values (Literals):**
• Numbers are written with or without decimals: \`10.50\`, \`100\`.
• Strings are text, written within double or single quotes: \`"John Doe"\`, \`'John Doe'\`.

**2. Variables:**
Variables are used to store data values. JavaScript uses the \`var\`, \`let\`, and \`const\` keywords to declare variables.

**3. Case Sensitivity:**
JavaScript is case-sensitive. Variables \`lastname\` and \`lastName\` are two different variables.

**4. Camel Case:**
Historically, programmers use different ways of joining multiple words into one variable name. JavaScript developers often use lower camel case: \`firstName\`, \`masterCard\`.`,
        slug: "javascript-syntax",
        order: 5
    },
    {
        language: "JavaScript",
        topic: "JavaScript Comments",
        content: `**JavaScript Comments**
Comments can be used to explain JavaScript code, and to make it more readable. They can also be used to prevent execution when testing alternative code.

**1. Single Line Comments:**
Single line comments start with \`//\`.
\`\`\`javascript
// This is a single line comment
let x = 5; // Also a comment
\`\`\`

**2. Multi-line Comments:**
Multi-line comments start with \`/*\` and end with \`*/\`.
\`\`\`javascript
/*
  The code below will change
  the heading with id="myH"
  and the paragraph with id="myP"
*/
\`\`\`

**Tip:** Comments are for humans; computers ignore them during execution.`,
        slug: "javascript-comments",
        order: 6
    },
    {
        language: "JavaScript",
        topic: "JavaScript Variables",
        content: `**Variables in JavaScript**
Variables are containers for storing data. In JavaScript, there are 3 ways to declare a variable:

**1. var (The Old Way):**
Function-scoped or globally-scoped. Avoid using it in modern code due to hoisting issues.

**2. let (Modern Way):**
Block-scoped. Use this for variables that can change later.
\`\`\`javascript
let age = 25;
age = 26; // Success
\`\`\`

**3. const (Modern Way):**
Block-scoped. Use this for values that should not be reassigned.
\`\`\`javascript
const PI = 3.14;
// PI = 3.15; // Error: Assignment to constant variable
\`\`\`

**Naming Rules:**
• Names can contain letters, digits, underscores, and dollar signs.
• Names must begin with a letter or $ or _.
• Names are case sensitive.`,
        slug: "javascript-variables",
        order: 7
    },
    {
        language: "JavaScript",
        topic: "JavaScript Operators",
        content: `**Types of Operators**
Operators are used to perform operations on variables and values.

**1. Arithmetic Operators:**
• \`+\` (Addition)
• \`-\` (Subtraction)
• \`*\` (Multiplication)
• \`/\` (Division)
• \`%\` (Modulus/Remainder)
• \`++\` (Increment)
• \`--\` (Decrement)

**2. Assignment Operators:**
• \`=\` (x = y)
• \`+=\` (x = x + y)

**3. Comparison Operators:**
• \`==\` (Equal to)
• \`===\` (Equal value and type)
• \`!=\` (Not equal)
• \`>\` (Greater than)

**4. Logical Operators:**
• \`&&\` (Logical AND)
• \`||\` (Logical OR)
• \`!\` (Logical NOT)`,
        slug: "javascript-operators",
        order: 8
    },
    {
        language: "JavaScript",
        topic: "JavaScript Data Types",
        content: `**JavaScript Data Types**
JavaScript variables can hold many data types: numbers, strings, objects and more.

**1. Primitive Types:**
• **String:** \`let x = "John";\`
• **Number:** \`let y = 3.14;\`
• **Boolean:** \`let z = true;\`
• **Undefined:** A variable without a value.
• **Null:** Represents "nothing".

**2. Complex Types (Objects):**
• **Object:** A collection of name-value pairs.
• **Array:** A list of values.
\`\`\`javascript
const cities = ["New York", "London", "Paris"];
const person = { name: "John", age: 30 };
\`\`\`

**Dynamic Typing:**
JavaScript has dynamic types. This means that the same variable can be used to hold different data types.`,
        slug: "javascript-data-types",
        order: 9
    },
    {
        language: "JavaScript",
        topic: "JavaScript Functions",
        content: `**What is a Function?**
A JavaScript function is a block of code designed to perform a particular task. It is executed when "something" invokes it (calls it).

**Function Syntax:**
\`\`\`javascript
function name(parameter1, parameter2) {
  // code to be executed
  return parameter1 * parameter2;
}
\`\`\`

**Function Invocation:**
The code inside the function will execute when the function is invoked:
• When an event occurs (user clicks a button).
• When it is called from JavaScript code.
• Automatically (self invoked).

**Example:**
\`\`\`javascript
function toCelsius(f) {
  return (5/9) * (f - 32);
}
let temp = toCelsius(77);
\`\`\``,
        slug: "javascript-functions",
        order: 10
    },
    {
        language: "JavaScript",
        topic: "JavaScript Objects",
        content: `**JavaScript Objects**
In real life, a car is an object. A car has properties like weight and color, and methods like start and stop.

**Object Definition:**
Objects are variables too. But objects can contain many values.
\`\`\`javascript
const car = {
  type: "Fiat",
  model: "500",
  color: "white"
};
\`\`\`

**Object Methods:**
Methods are actions that can be performed on objects. Methods are stored in properties as function definitions.
\`\`\`javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
\`\`\`

**Accessing Properties:**
• \`objectName.propertyName\`
• \`objectName["propertyName"]\``,
        slug: "javascript-objects",
        order: 11
    },
    {
        language: "JavaScript",
        topic: "JavaScript Events",
        content: `**What are JavaScript Events?**
HTML events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events.

**Common HTML Events:**
• **onchange:** An HTML element has been changed.
• **onclick:** The user clicks an HTML element.
• **onmouseover:** The user moves the mouse over an HTML element.
• **onmouseout:** The user moves the mouse away from an HTML element.
• **onkeydown:** The user pushes a keyboard key.
• **onload:** The browser has finished loading the page.

**Example:**
\`\`\`html
<button onclick="document.getElementById('demo').innerHTML = Date()">
  The time is?
</button>
\`\`\`

**Event Handlers:**
Event handlers can be used to handle and verify user input, user actions, and browser actions.`,
        slug: "javascript-events",
        order: 12
    },
    {
        language: "JavaScript",
        topic: "JavaScript Strings",
        content: `**JavaScript Strings**
A JavaScript string is zero or more characters written inside quotes.

**Example:**
\`\`\`javascript
let name = "John Doe";
\`\`\`

**Special Characters:**
Because strings must be written within quotes, JavaScript will misunderstand this string:
\`let text = "We are the so-called "Vikings" from the north.";\`
To solve this problem, use the backslash escape character: \`\\"\`.
\`let text = "We are the so-called \\"Vikings\\" from the north.";\`

**String Properties and Methods:**
• **length:** Returns the length of a string.
• **toUpperCase():** Converts to upper case.
• **indexOf():** Returns the index of a found string.

**Template Literals:**
Use backticks (\` \`) for multi-line strings and string interpolation (\${variable}).`,
        slug: "javascript-strings",
        order: 13
    },
    {
        language: "JavaScript",
        topic: "JavaScript Numbers",
        content: `**JavaScript Numbers**
JavaScript has only one type of number. Numbers can be written with or without decimals.

**Example:**
\`\`\`javascript
let x = 3.14;    // A number with decimals
let y = 3;       // A number without decimals
\`\`\`

**Precision:**
Integers are accurate up to 15 digits. Floating point arithmetic is not always 100% accurate:
\`let x = 0.2 + 0.1; // x will be 0.30000000000000004\`

**Number Methods:**
• **toString():** Returns a number as a string.
• **toFixed():** Returns a string, with the number written with a specified number of decimals.
• **Number():** Converts variables to numbers.

**NaN - Not a Number:**
\`NaN\` is a JavaScript reserved word indicating that a number is not a legal number.`,
        slug: "javascript-numbers",
        order: 14
    },
    {
        language: "JavaScript",
        topic: "JavaScript Arrays",
        content: `**What is an Array?**
An array is a special variable, which can hold more than one value at a time.

**Creating an Array:**
\`\`\`javascript
const cars = ["Saab", "Volvo", "BMW"];
\`\`\`

**Accessing Array Elements:**
You access an array element by referring to the index number (starts at 0).
\`\`\`javascript
let car = cars[0]; // Returns "Saab"
cars[0] = "Opel"; // Changes the value
\`\`\`

**Array Property:**
• **length:** Returns the number of elements in an array.

**Converting an Array to a String:**
The JavaScript method \`toString()\` converts an array to a string of (comma separated) array values.`,
        slug: "javascript-arrays",
        order: 15
    },
    {
        language: "JavaScript",
        topic: "JavaScript Array Methods",
        content: `**JavaScript Array Methods**
Arrays have built-in methods to perform various operations.

**Adding/Removing Elements:**
• **push():** Adds a new element to the end of an array.
• **pop():** Removes the last element from an array.
• **shift():** Removes the first element and "shifts" all other elements to a lower index.
• **unshift():** Adds a new element to the beginning and "unshifts" older elements.

**Merging Arrays:**
• **concat():** Creates a new array by merging existing arrays.

**Splicing and Slicing:**
• **splice():** Adds/removes elements to/from an array.
• **slice():** Slices out a piece of an array into a new array.

**Sorting:**
• **sort():** Sorts an array alphabetically.
• **reverse():** Reverses the elements in an array.`,
        slug: "javascript-array-methods",
        order: 16
    },
    {
        language: "JavaScript",
        topic: "JavaScript Dates",
        content: `**JavaScript Date Objects**
JavaScript date objects let us work with dates.

**Creating Date Objects:**
There are 4 ways to create a new date object:
1. \`new Date()\`
2. \`new Date(year, month, day, hours, minutes, seconds, milliseconds)\`
3. \`new Date(milliseconds)\`
4. \`new Date(date string)\`

**Example:**
\`\`\`javascript
const d = new Date();
console.log(d); // Displays current date and time
\`\`\`

**Date Get Methods:**
• **getFullYear():** Get the year as a four digit number (yyyy).
• **getMonth():** Get the month (0-11).
• **getDate():** Get the day (1-31).

---
**Note:** JavaScript counts months from 0 to 11. January is 0, February is 1.`,
        slug: "javascript-dates",
        order: 17
    },
    {
        language: "JavaScript",
        topic: "JavaScript Math",
        content: `**The JavaScript Math Object**
The JavaScript Math object allows you to perform mathematical tasks on numbers.

**Math Methods:**
• **Math.round(x):** Returns the value of x rounded to its nearest integer.
• **Math.ceil(x):** Returns the value of x rounded up to its nearest integer.
• **Math.floor(x):** Returns the value of x rounded down to its nearest integer.
• **Math.trunc(x):** Returns the integer part of x.
• **Math.pow(x, y):** Returns the value of x to the power of y.
• **Math.sqrt(x):** Returns the square root of x.
• **Math.abs(x):** Returns the absolute (positive) value of x.
• **Math.random():** Returns a random number between 0 (inclusive), and 1 (exclusive).

**Example:**
\`\`\`javascript
Math.PI; // Returns 3.141592653589793
Math.round(4.6); // Returns 5
Math.floor(4.7); // Returns 4
\`\`\``,
        slug: "javascript-math",
        order: 18
    },
    {
        language: "JavaScript",
        topic: "JavaScript Booleans and Comparisons",
        content: `**JavaScript Booleans**
A JavaScript Boolean represents one of two values: **true** or **false**.

**Boolean Values:**
You can use the \`Boolean()\` function to find out if an expression (or a variable) is true:
\`\`\`javascript
Boolean(10 > 9) // Returns true
\`\`\`

**Comparison Operators:**
• \`==\` (equal to)
• \`===\` (equal value and equal type)
• \`!=\` (not equal)
• \`!==\` (not equal value or not equal type)
• \`>\` (greater than)
• \`<\` (less than)
• \`>=\` (greater than or equal to)
• \`<=\` (less than or equal to)

**Example:**
\`\`\`javascript
let x = 5;
x == 5;    // true
x == "5";  // true
x === 5;   // true
x === "5"; // false
\`\`\``,
        slug: "javascript-booleans-and-comparisons",
        order: 19
    },
    {
        language: "JavaScript",
        topic: "JavaScript If-Else Statements",
        content: `**Conditional Statements**
Very often when you write code, you want to perform different actions for different decisions. You can use conditional statements in your code to do this.

**1. The if Statement:**
Use \`if\` to specify a block of code to be executed, if a specified condition is true.
\`\`\`javascript
if (condition) {
  // block of code to be executed if the condition is true
}
\`\`\`

**2. The else Statement:**
Use \`else\` to specify a block of code to be executed, if the same condition is false.

**3. The else if Statement:**
Use \`else if\` to specify a new condition to test, if the first condition is false.

**Example:**
\`\`\`javascript
let hour = 18;
if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
\`\`\``,
        slug: "javascript-if-else-statements",
        order: 20
    }
];

const seedJS = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for 20 JavaScript topics seeding (GFG Style)...");

        // Remove old JS topics to ensure exactly 20
        await Topic.deleteMany({ language: "JavaScript" });
        console.log("Cleared existing JavaScript topics.");

        await Topic.insertMany(jsTopics);
        console.log("Successfully seeded 20 detailed JavaScript topics!");

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedJS();
