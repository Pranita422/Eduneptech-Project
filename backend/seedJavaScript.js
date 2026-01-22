/**
 * Seed JavaScript Topics
 * Demonstrates multi-language support
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const jsTopics = [
    {
        language: "JavaScript",
        topic: "Introduction to JavaScript",
        theory: `**What is JavaScript?**

JavaScript is a programming language that makes websites interactive. While HTML structures content and CSS styles it, JavaScript brings it to life!

---

**What Can JavaScript Do?**

• Change HTML content dynamically
• Respond to user actions (clicks, typing, etc.)
• Validate forms before submission
• Create animations and effects
• Fetch data from servers without reloading

---

**Where Does JavaScript Run?**

**1. In the Browser** (Client-side)
• Runs on the user's computer
• Makes web pages interactive

**2. On the Server** (Node.js)
• Runs on servers
• Builds backend applications

---

**Your First JavaScript Code**

<script>
  alert("Hello, World!");
</script>

This displays a popup message!

---

**JavaScript in HTML**

You can add JavaScript in three ways:

**1. Inline** (not recommended)
<button onclick="alert('Clicked!')">Click Me</button>

**2. Internal** (in <script> tags)
<script>
  console.log("Hello from JavaScript!");
</script>

**3. External** (separate .js file)
<script src="script.js"></script>

---

**Console.log() - Your Best Friend**

console.log("Hello!");

This prints messages to the browser's developer console - essential for debugging!

---

**Summary**

• JavaScript makes websites interactive
• Runs in browsers and on servers (Node.js)
• Use console.log() to debug your code
• External .js files are the best practice`
    },
    {
        language: "JavaScript",
        topic: "Variables and Data Types",
        theory: `**JavaScript Variables**

Variables store data values. Think of them as labeled boxes that hold information.

---

**Declaring Variables**

**let** - Can be changed
let age = 25;
age = 26; // OK!

**const** - Cannot be changed
const name = "Alice";
name = "Bob"; // Error!

**var** - Old way (avoid using)
var city = "Paris";

---

**Data Types**

**1. String** - Text
let message = "Hello World";
let name = 'Alice';

**2. Number** - Numbers (integers and decimals)
let age = 25;
let price = 19.99;

**3. Boolean** - True or False
let isStudent = true;
let hasLicense = false;

**4. Undefined** - No value assigned
let x;
console.log(x); // undefined

**5. Null** - Intentionally empty
let data = null;

---

**Checking Types**

typeof "Hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"

---

**String Concatenation**

let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
// Result: "John Doe"

**Template Literals** (modern way)
let greeting = \`Hello, \${firstName}!\`;
// Result: "Hello, John!"

---

**Summary**

• Use **let** for variables that change
• Use **const** for constants
• Strings use quotes: "text" or 'text'
• Template literals use backticks: \`text\``
    },
    {
        language: "JavaScript",
        topic: "Functions",
        theory: `**JavaScript Functions**

Functions are reusable blocks of code that perform specific tasks.

---

**Function Declaration**

function greet() {
  console.log("Hello!");
}

greet(); // Call the function

---

**Functions with Parameters**

function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alice"); // Hello, Alice!
greet("Bob");   // Hello, Bob!

---

**Return Values**

function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result); // 8

---

**Arrow Functions** (Modern Syntax)

const greet = (name) => {
  return "Hello, " + name;
};

// Shorter version (one-liner)
const greet = name => "Hello, " + name;

---

**Function Examples**

// Calculate area
function calculateArea(width, height) {
  return width * height;
}

// Check if even
function isEven(number) {
  return number % 2 === 0;
}

console.log(isEven(4));  // true
console.log(isEven(7));  // false

---

**Summary**

• Functions make code reusable
• Use **function name()** or **arrow functions**
• **return** sends values back
• Call functions with parentheses: **greet()**`
    },
    {
        language: "JavaScript",
        topic: "Arrays",
        theory: `**JavaScript Arrays**

Arrays store multiple values in a single variable.

---

**Creating Arrays**

let fruits = ["Apple", "Banana", "Orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["text", 42, true];

---

**Accessing Elements**

Arrays use zero-based indexing:

let fruits = ["Apple", "Banana", "Orange"];
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana

---

**Array Properties and Methods**

**Length**
let fruits = ["Apple", "Banana"];
console.log(fruits.length); // 2

**Add to End**
fruits.push("Orange");
// ["Apple", "Banana", "Orange"]

**Remove from End**
fruits.pop();
// ["Apple", "Banana"]

**Add to Start**
fruits.unshift("Mango");
// ["Mango", "Apple", "Banana"]

**Remove from Start**
fruits.shift();
// ["Apple", "Banana"]

---

**Looping Through Arrays**

let fruits = ["Apple", "Banana", "Orange"];

// For loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// forEach (modern way)
fruits.forEach(fruit => {
  console.log(fruit);
});

---

**Summary**

• Arrays store multiple values
• Index starts at 0
• **push()** adds to end, **pop()** removes from end
• **forEach()** loops through elements`
    },
    {
        language: "JavaScript",
        topic: "Objects",
        theory: `**JavaScript Objects**

Objects store related data and functionality together using key-value pairs.

---

**Creating Objects**

let person = {
  name: "Alice",
  age: 25,
  city: "Paris"
};

---

**Accessing Properties**

**Dot notation**
console.log(person.name); // Alice

**Bracket notation**
console.log(person["age"]); // 25

---

**Modifying Properties**

person.age = 26;
person.country = "France"; // Add new property

---

**Object Methods**

Objects can contain functions:

let person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

person.greet(); // Hello, I'm Alice

---

**Real-World Example**

let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023,
  start: function() {
    console.log("Engine started!");
  }
};

console.log(car.brand); // Toyota
car.start(); // Engine started!

---

**Summary**

• Objects use key-value pairs
• Access with dot or bracket notation
• Objects can contain functions (methods)
• Use **this** to reference object properties`
    }
];

async function seedJS() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected\n");

    for (const topic of jsTopics) {
        const existing = await Topic.findOne({
            language: topic.language,
            topic: topic.topic
        });

        if (existing) {
            existing.theory = topic.theory;
            await existing.save();
            console.log(`✅ Updated: ${topic.topic}`);
        } else {
            await Topic.create(topic);
            console.log(`✨ Created: ${topic.topic}`);
        }
    }

    console.log(`\n📊 ${jsTopics.length} JavaScript topics seeded!`);
    await mongoose.disconnect();
}

seedJS();
