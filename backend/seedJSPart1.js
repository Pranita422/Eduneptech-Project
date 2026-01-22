/**
 * Complete JavaScript Topics Seed Script
 * Fills in all missing JavaScript topic content
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const jsTopicsContent = [
    {
        topic: "JavaScript Syntax",
        theory: `**JavaScript Syntax Basics**

JavaScript syntax is the set of rules that define how programs are written.

---

**Statements**

JavaScript code is made of statements that end with semicolons:

let x = 5;
let y = 10;
let z = x + y;

---

**Case Sensitivity**

JavaScript is case-sensitive:

let myVariable = 5;
let myvariable = 10; // Different variable!

---

**Comments**

// Single line comment

/* Multi-line
   comment */

---

**Code Blocks**

Use curly braces {} to group statements:

if (x > 5) {
  console.log("x is greater than 5");
  console.log("This is inside the block");
}

---

**Whitespace**

JavaScript ignores extra spaces:

let x=5+10;  // Same as
let x = 5 + 10;

---

**Summary**

• Statements end with semicolons
• JavaScript is case-sensitive
• Use // for comments
• {} creates code blocks`
    },
    {
        topic: "Variables (var, let, const)",
        theory: `**JavaScript Variables: var, let, const**

Three ways to declare variables, each with different rules.

---

**let - Modern, Block-Scoped**

let age = 25;
age = 26; // Can be reassigned
console.log(age); // 26

**Scope Example:**
if (true) {
  let x = 10;
}
console.log(x); // Error! x not accessible outside block

---

**const - Cannot Be Reassigned**

const PI = 3.14159;
PI = 3.14; // Error! Cannot reassign

**But objects can be modified:**
const person = { name: "Alice" };
person.name = "Bob"; // OK!
person.age = 25; // OK!

---

**var - Old Way (Avoid)**

var name = "John";
var name = "Jane"; // No error (problematic!)

**Function-scoped, not block-scoped:**
if (true) {
  var x = 10;
}
console.log(x); // 10 (accessible outside!)

---

**Best Practices**

• Use **const** by default
• Use **let** if you need to reassign
• Avoid **var** in modern code

---

**Summary**

• **const** = cannot reassign (use most often)
• **let** = can reassign, block-scoped
• **var** = old way, avoid using`
    },
    {
        topic: "Data Types",
        theory: `**JavaScript Data Types**

JavaScript has 7 primitive data types plus objects.

---

**1. String** - Text

let name = "Alice";
let message = 'Hello World';
let template = \`Hi, \${name}!\`;

---

**2. Number** - All numbers

let integer = 42;
let decimal = 3.14;
let negative = -10;
let scientific = 2e5; // 200000

---

**3. Boolean** - True/False

let isActive = true;
let isComplete = false;

---

**4. Undefined** - No value assigned

let x;
console.log(x); // undefined

---

**5. Null** - Intentionally empty

let data = null;

---

**6. Symbol** - Unique identifier (advanced)

let id = Symbol('id');

---

**7. BigInt** - Very large integers

let big = 9007199254740991n;

---

**Objects** - Collections of data

let person = {
  name: "Alice",
  age: 25
};

let numbers = [1, 2, 3, 4];

---

**Type Checking**

typeof "Hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
typeof undefined // "undefined"
typeof null     // "object" (known quirk!)

---

**Summary**

• 7 primitive types: String, Number, Boolean, Undefined, Null, Symbol, BigInt
• Objects and Arrays are reference types
• Use typeof to check types`
    },
    {
        topic: "Operators",
        theory: `**JavaScript Operators**

Operators perform operations on values and variables.

---

**Arithmetic Operators**

let x = 10, y = 3;

x + y  // 13 (Addition)
x - y  // 7  (Subtraction)
x * y  // 30 (Multiplication)
x / y  // 3.333... (Division)
x % y  // 1  (Modulus/Remainder)
x ** y // 1000 (Exponentiation)

---

**Assignment Operators**

let x = 10;
x += 5;  // x = x + 5 → 15
x -= 3;  // x = x - 3 → 12
x *= 2;  // x = x * 2 → 24
x /= 4;  // x = x / 4 → 6

---

**Comparison Operators**

5 == "5"   // true (loose equality)
5 === "5"  // false (strict equality)
5 != "5"   // false
5 !== "5"  // true
5 > 3      // true
5 < 3      // false
5 >= 5     // true
5 <= 4     // false

---

**Logical Operators**

true && false  // false (AND)
true || false  // true (OR)
!true          // false (NOT)

**Example:**
let age = 25;
if (age >= 18 && age < 65) {
  console.log("Working age");
}

---

**Increment/Decrement**

let x = 5;
x++;  // x = 6 (increment)
x--;  // x = 5 (decrement)

---

**String Operator**

"Hello" + " " + "World"  // "Hello World"

---

**Summary**

• **+, -, *, /, %** for math
• **===** for strict equality (recommended)
• **&&, ||, !** for logic
• **++, --** for increment/decrement`
    },
    {
        topic: "Conditional Statements",
        theory: `**JavaScript Conditional Statements**

Make decisions in your code based on conditions.

---

**if Statement**

let age = 18;

if (age >= 18) {
  console.log("You are an adult");
}

---

**if...else Statement**

let temperature = 25;

if (temperature > 30) {
  console.log("It's hot!");
} else {
  console.log("It's nice!");
}

---

**if...else if...else**

let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

---

**Ternary Operator** (Shorthand)

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

---

**switch Statement**

let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Midweek");
}

---

**Truthy and Falsy Values**

**Falsy values** (evaluate to false):
• false
• 0
• "" (empty string)
• null
• undefined
• NaN

**Everything else is truthy!**

if ("Hello") {
  console.log("This runs!"); // Truthy
}

---

**Summary**

• **if/else** for simple conditions
• **else if** for multiple conditions
• **switch** for many specific values
• **? :** ternary for one-liners`
    },
    {
        topic: "Loops",
        theory: `**JavaScript Loops**

Loops execute code repeatedly until a condition is met.

---

**for Loop**

for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0, 1, 2, 3, 4

**Parts:**
• **Initialization**: let i = 0
• **Condition**: i < 5
• **Increment**: i++

---

**while Loop**

let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

---

**do...while Loop**

Runs at least once:

let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

---

**for...of Loop** (Arrays)

let fruits = ["Apple", "Banana", "Orange"];

for (let fruit of fruits) {
  console.log(fruit);
}
// Apple, Banana, Orange

---

**for...in Loop** (Objects)

let person = {
  name: "Alice",
  age: 25,
  city: "Paris"
};

for (let key in person) {
  console.log(key + ": " + person[key]);
}

---

**break and continue**

**break** - Exit loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0,1,2,3,4
}

**continue** - Skip iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0,1,3,4
}

---

**Summary**

• **for** - when you know iteration count
• **while** - when condition-based
• **for...of** - loop through arrays
• **for...in** - loop through object properties`
    },
    {
        topic: "Arrow Functions",
        theory: `**Arrow Functions (ES6)**

A shorter syntax for writing functions.

---

**Traditional Function**

function add(a, b) {
  return a + b;
}

---

**Arrow Function**

const add = (a, b) => {
  return a + b;
};

---

**Shorter Syntax** (one-liner)

const add = (a, b) => a + b;

**Single parameter** (no parentheses needed)
const square = x => x * x;

**No parameters**
const greet = () => console.log("Hello!");

---

**Examples**

// Multiple lines
const calculateTotal = (price, tax) => {
  let total = price + (price * tax);
  return total;
};

// One line
const double = n => n * 2;

// No parameters
const random = () => Math.random();

---

**Array Methods with Arrows**

let numbers = [1, 2, 3, 4, 5];

// Map
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce
let sum = numbers.reduce((total, n) => total + n, 0);
// 15

---

**When to Use**

✅ **Use arrow functions for:**
• Callbacks
• Array methods
• Short functions

❌ **Don't use for:**
• Object methods (this binding issues)
• Constructors

---

**Summary**

• Shorter syntax: **() => {}**
• Implicit return for one-liners
• Perfect for callbacks and array methods`
    },
    {
        topic: "Array Methods",
        theory: `**JavaScript Array Methods**

Powerful built-in methods for working with arrays.

---

**Adding/Removing Elements**

let fruits = ["Apple", "Banana"];

fruits.push("Orange");     // Add to end
fruits.pop();              // Remove from end
fruits.unshift("Mango");   // Add to start
fruits.shift();            // Remove from start

---

**map() - Transform Elements**

let numbers = [1, 2, 3, 4];
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]

---

**filter() - Select Elements**

let numbers = [1, 2, 3, 4, 5, 6];
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

---

**find() - Find First Match**

let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

let user = users.find(u => u.age > 25);
// { name: "Bob", age: 30 }

---

**reduce() - Reduce to Single Value**

let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((total, n) => total + n, 0);
// 10

---

**forEach() - Loop Through**

let fruits = ["Apple", "Banana"];
fruits.forEach(fruit => console.log(fruit));

---

**includes() - Check if Exists**

let fruits = ["Apple", "Banana"];
fruits.includes("Apple");  // true
fruits.includes("Orange"); // false

---

**slice() - Extract Portion**

let numbers = [1, 2, 3, 4, 5];
let subset = numbers.slice(1, 4);
// [2, 3, 4]

---

**splice() - Add/Remove**

let fruits = ["Apple", "Banana", "Orange"];
fruits.splice(1, 1, "Mango", "Grape");
// Removes "Banana", adds "Mango" and "Grape"

---

**sort() - Sort Elements**

let numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b);
// [1, 1, 3, 4, 5]

---

**Summary**

• **map()** - transform
• **filter()** - select
• **reduce()** - combine
• **find()** - search
• **forEach()** - iterate`
    },
    {
        topic: "Object Methods",
        theory: `**JavaScript Object Methods**

Objects can contain functions called methods.

---

**Defining Methods**

let person = {
  name: "Alice",
  age: 25,
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

person.greet(); // "Hello, I'm Alice"

---

**Shorthand Syntax** (ES6)

let person = {
  name: "Alice",
  greet() {
    console.log("Hello!");
  }
};

---

**The 'this' Keyword**

Refers to the object itself:

let car = {
  brand: "Toyota",
  model: "Camry",
  getInfo() {
    return this.brand + " " + this.model;
  }
};

console.log(car.getInfo()); // "Toyota Camry"

---

**Built-in Object Methods**

**Object.keys()** - Get all keys
let person = { name: "Alice", age: 25 };
Object.keys(person); // ["name", "age"]

**Object.values()** - Get all values
Object.values(person); // ["Alice", 25]

**Object.entries()** - Get key-value pairs
Object.entries(person);
// [["name", "Alice"], ["age", 25]]

---

**Object.assign()** - Copy/Merge

let obj1 = { a: 1 };
let obj2 = { b: 2 };
let merged = Object.assign({}, obj1, obj2);
// { a: 1, b: 2 }

---

**Practical Example**

let calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  },
  subtract(n) {
    this.value -= n;
    return this;
  },
  getResult() {
    return this.value;
  }
};

calculator.add(10).subtract(3).getResult(); // 7

---

**Summary**

• Methods are functions inside objects
• **this** refers to the object
• **Object.keys/values/entries** for inspection
• Methods can return **this** for chaining`
    }
];

async function seedJS() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected\n");

    let updated = 0, created = 0;

    for (const topicData of jsTopicsContent) {
        const existing = await Topic.findOne({
            language: "JavaScript",
            topic: topicData.topic
        });

        if (existing) {
            existing.theory = topicData.theory;
            await existing.save();
            console.log(`✅ Updated: ${topicData.topic}`);
            updated++;
        } else {
            await Topic.create({
                language: "JavaScript",
                topic: topicData.topic,
                theory: topicData.theory,
                completedBy: []
            });
            console.log(`✨ Created: ${topicData.topic}`);
            created++;
        }
    }

    console.log(`\n📊 ${updated} updated, ${created} created`);
    await mongoose.disconnect();
}

seedJS();
