/**
 * JavaScript Topics Part 2 - DOM, Events, Strings, Advanced
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const topics = [
    {
        topic: "DOM Introduction",
        theory: `**Document Object Model (DOM)**

The DOM is a programming interface for HTML documents. It represents the page as a tree of objects that JavaScript can manipulate.

---

**What is the DOM?**

When a web page loads, the browser creates a Document Object Model of the page. This allows JavaScript to:
• Change HTML content
• Change HTML attributes
• Change CSS styles
• Add/remove HTML elements
• React to events

---

**Accessing Elements**

**By ID**
let element = document.getElementById("myId");

**By Class**
let elements = document.getElementsByClassName("myClass");

**By Tag**
let paragraphs = document.getElementsByTagName("p");

**Query Selector** (modern, recommended)
let element = document.querySelector(".myClass");
let all = document.querySelectorAll("p");

---

**Example**

<p id="demo">Hello</p>

<script>
  let p = document.getElementById("demo");
  console.log(p.textContent); // "Hello"
</script>

---

**Summary**

• DOM = tree structure of HTML
• Use **querySelector()** to find elements
• JavaScript can read and modify the DOM`
    },
    {
        topic: "DOM Manipulation",
        theory: `**DOM Manipulation**

Change HTML content and structure with JavaScript.

---

**Changing Content**

**textContent** - Plain text
let p = document.querySelector("p");
p.textContent = "New text";

**innerHTML** - HTML content
let div = document.querySelector("div");
div.innerHTML = "<strong>Bold text</strong>";

---

**Changing Attributes**

let img = document.querySelector("img");
img.src = "newimage.jpg";
img.alt = "New description";

let link = document.querySelector("a");
link.href = "https://newurl.com";

---

**Changing Styles**

let p = document.querySelector("p");
p.style.color = "blue";
p.style.fontSize = "20px";
p.style.backgroundColor = "yellow";

---

**Adding/Removing Classes**

let div = document.querySelector("div");
div.classList.add("highlight");
div.classList.remove("old-class");
div.classList.toggle("active");

---

**Creating Elements**

let newP = document.createElement("p");
newP.textContent = "New paragraph";
document.body.appendChild(newP);

---

**Removing Elements**

let element = document.querySelector("#remove-me");
element.remove();

---

**Summary**

• **textContent/innerHTML** to change content
• **style** to change CSS
• **classList** to manage classes
• **createElement()** to add elements`
    },
    {
        topic: "Events",
        theory: `**JavaScript Events**

Events are actions that happen in the browser that JavaScript can respond to.

---

**Common Events**

• **click** - User clicks element
• **mouseover** - Mouse moves over element
• **keydown** - User presses key
• **submit** - Form is submitted
• **load** - Page finishes loading

---

**Adding Event Listeners**

let button = document.querySelector("button");

button.addEventListener("click", function() {
  alert("Button clicked!");
});

**Arrow function syntax:**
button.addEventListener("click", () => {
  console.log("Clicked!");
});

---

**Event Object**

button.addEventListener("click", (event) => {
  console.log(event.target); // The clicked element
  console.log(event.type);   // "click"
});

---

**Mouse Events**

element.addEventListener("mouseover", () => {
  console.log("Mouse entered");
});

element.addEventListener("mouseout", () => {
  console.log("Mouse left");
});

---

**Keyboard Events**

document.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});

---

**Form Events**

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop form submission
  console.log("Form submitted");
});

---

**Removing Event Listeners**

function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

---

**Summary**

• Use **addEventListener()** to handle events
• Event object contains info about the event
• **preventDefault()** stops default behavior`
    },
    {
        topic: "Strings & String Methods",
        theory: `**JavaScript Strings and Methods**

Strings are text values with many useful methods.

---

**Creating Strings**

let str1 = "Hello";
let str2 = 'World';
let str3 = \`Template \${str1}\`;

---

**String Properties**

let text = "Hello";
text.length; // 5

---

**Common String Methods**

**toUpperCase() / toLowerCase()**
"Hello".toUpperCase(); // "HELLO"
"Hello".toLowerCase(); // "hello"

**trim()** - Remove whitespace
"  Hello  ".trim(); // "Hello"

**includes()** - Check if contains
"Hello World".includes("World"); // true

**startsWith() / endsWith()**
"Hello".startsWith("He"); // true
"Hello".endsWith("lo");   // true

---

**Extracting Parts**

**slice(start, end)**
"Hello World".slice(0, 5); // "Hello"
"Hello World".slice(6);    // "World"

**substring(start, end)**
"Hello".substring(1, 4); // "ell"

**charAt(index)**
"Hello".charAt(0); // "H"

---

**Replacing Text**

"Hello World".replace("World", "JavaScript");
// "Hello JavaScript"

**replaceAll()**
"aa bb aa".replaceAll("aa", "cc");
// "cc bb cc"

---

**Splitting Strings**

"apple,banana,orange".split(",");
// ["apple", "banana", "orange"]

---

**Template Literals**

let name = "Alice";
let age = 25;
let message = \`My name is \${name} and I'm \${age} years old.\`;

---

**Summary**

• Strings have many built-in methods
• Use template literals for interpolation
• **slice()**, **replace()**, **split()** are very useful`
    },
    {
        topic: "Math & Date Objects",
        theory: `**Math and Date Objects**

Built-in objects for mathematical operations and date/time handling.

---

**Math Object**

**Constants**
Math.PI;  // 3.141592653589793
Math.E;   // 2.718281828459045

**Rounding**
Math.round(4.7);  // 5
Math.ceil(4.1);   // 5 (round up)
Math.floor(4.9);  // 4 (round down)

**Min/Max**
Math.min(1, 5, 3);  // 1
Math.max(1, 5, 3);  // 5

**Random**
Math.random(); // Random number 0-1

// Random integer 1-10
Math.floor(Math.random() * 10) + 1;

**Power/Square Root**
Math.pow(2, 3);  // 8 (2³)
Math.sqrt(16);   // 4

---

**Date Object**

**Creating Dates**
let now = new Date();
let specific = new Date("2024-01-15");
let custom = new Date(2024, 0, 15); // Month is 0-indexed!

**Getting Date Parts**
let now = new Date();
now.getFullYear();  // 2024
now.getMonth();     // 0-11 (0=January)
now.getDate();      // 1-31
now.getDay();       // 0-6 (0=Sunday)
now.getHours();     // 0-23
now.getMinutes();   // 0-59
now.getSeconds();   // 0-59

**Setting Date Parts**
let date = new Date();
date.setFullYear(2025);
date.setMonth(11); // December
date.setDate(25);

**Formatting Dates**
let date = new Date();
date.toDateString();      // "Mon Jan 15 2024"
date.toLocaleDateString(); // "1/15/2024"
date.toISOString();       // "2024-01-15T10:30:00.000Z"

---

**Summary**

• **Math** for calculations and random numbers
• **Date** for working with dates/times
• Months are 0-indexed (0=January)
• Use **Math.random()** for random numbers`
    },
    {
        topic: "Promises & Async/Await",
        theory: `**Promises and Async/Await**

Handle asynchronous operations in JavaScript.

---

**What is a Promise?**

A Promise represents a value that may not be available yet.

**States:**
• Pending - Initial state
• Fulfilled - Operation succeeded
• Rejected - Operation failed

---

**Creating a Promise**

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

---

**Using Promises**

promise
  .then(result => {
    console.log(result); // "Success!"
  })
  .catch(error => {
    console.error(error);
  });

---

**Async/Await** (Modern Syntax)

async function fetchData() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

---

**Practical Example**

// Simulating API call
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, name: "Alice" });
      } else {
        reject("Invalid ID");
      }
    }, 1000);
  });
}

// Using async/await
async function displayUser() {
  try {
    let user = await getUser(1);
    console.log(user.name);
  } catch (error) {
    console.error(error);
  }
}

---

**Promise.all()** - Wait for multiple

let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [1, 2, 3]
});

---

**Summary**

• Promises handle async operations
• **async/await** makes promises easier
• **try/catch** for error handling
• **Promise.all()** for multiple promises`
    },
    {
        topic: "ES6 Features",
        theory: `**ES6 (ECMAScript 2015) Features**

Modern JavaScript features that make code cleaner and more powerful.

---

**let and const**

// Block-scoped variables
let x = 10;
const PI = 3.14;

---

**Arrow Functions**

const add = (a, b) => a + b;

---

**Template Literals**

let name = "Alice";
let greeting = \`Hello, \${name}!\`;

---

**Destructuring**

**Arrays:**
let [a, b] = [1, 2];
console.log(a); // 1

**Objects:**
let person = { name: "Alice", age: 25 };
let { name, age } = person;
console.log(name); // "Alice"

---

**Spread Operator (...)**

**Arrays:**
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];
// [1, 2, 3, 4]

**Objects:**
let obj1 = { a: 1 };
let obj2 = { ...obj1, b: 2 };
// { a: 1, b: 2 }

---

**Rest Parameters**

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10

---

**Default Parameters**

function greet(name = "Guest") {
  console.log(\`Hello, \${name}!\`);
}

greet(); // "Hello, Guest!"

---

**Classes**

class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
}

let alice = new Person("Alice");
alice.greet();

---

**Modules**

**Export:**
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}

**Import:**
import { PI, add } from './math.js';

---

**Summary**

• **let/const** for variables
• **Arrow functions** for concise syntax
• **Destructuring** to extract values
• **Spread/Rest** for flexible arrays/objects
• **Classes** for object-oriented code`
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected\n");
    let count = 0;
    for (const t of topics) {
        const doc = await Topic.findOne({ language: "JavaScript", topic: t.topic });
        if (doc) {
            doc.theory = t.theory;
            await doc.save();
            console.log("✅", t.topic);
            count++;
        }
    }
    console.log(`\n📊 ${count} topics updated`);
    await mongoose.disconnect();
}
seed();
