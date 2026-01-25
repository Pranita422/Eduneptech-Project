const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const pythonTopics = [
    {
        language: "Python",
        topic: "Introduction to Python",
        content: `**What is Python?**
Python is a high-level, interpreted, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace.

**History and Philosophy:**
• **Created by:** Guido van Rossum in the late 1980s.
• **Named after:** "Monty Python's Flying Circus".
• **The Zen of Python:** A collection of 19 "guiding principles" for writing computer programs in Python (run \`import this\` to see them).

**Key Features:**
• **Interpreted:** Python code is processed at runtime by the interpreter.
• **Dynamically Typed:** You don't need to declare variable types.
• **Multi-paradigm:** Supports procedural, functional, and object-oriented programming.
• **Extensive Libraries:** "Batteries included" philosophy means there's a library for almost everything.
• **Cross-platform:** Runs on Windows, macOS, Linux, and even mobile platforms.

**Example Code:**
\`\`\`python
# Simple greeting function
def greet(name):
    return f"Hello, {name}! Welcome to Python."

print(greet("Developer"))
\`\`\`

---
**Why Choose Python?**
Python is currently the most popular language for Data Science, AI, and Automation. Its syntax is clean and readable, making it ideal for both beginners and experts.`,
        slug: "introduction-to-python",
        order: 1
    },
    {
        language: "Python",
        topic: "Python Environment Setup",
        content: `**Professional Environment Setup**
Setting up a proper development environment is the first step to successful Python programming.

**1. Installing Python:**
Visit [python.org](https://www.python.org/) to download the latest stable version.
• **Windows:** Check the box "Add Python to PATH" during installation.
• **macOS/Linux:** Usually comes pre-installed, but you should use a version manager like \`pyenv\` or \`conda\`.

**2. Virtual Environments (Crucial):**
Avoid installing libraries globally. Use \`venv\` to isolate project dependencies.
\`\`\`bash
python -m venv myenv
source myenv/bin/activate # Linux/macOS
myenv\\Scripts\\activate   # Windows
\`\`\`

**3. Popular Editors and IDEs:**
• **VS Code:** The current favorite. Lightweight with great Python extensions.
• **PyCharm:** A full-blown IDE designed specifically for Python.
• **Jupyter Notebooks:** Ideal for interactive data visualization and experimentation.

**Verification:**
\`\`\`bash
python --version
pip --version
\`\`\`

---
**Best Practice:** Always use a \`requirements.txt\` file to track your project's dependencies!`,
        slug: "python-setup",
        order: 2
    },
    {
        language: "Python",
        topic: "Python Basic Syntax",
        content: `**Core Syntax and Style**
Python has a unique syntax compared to languages like C++ or Java.

**1. Indentation is Mandatory:**
Spaces are used to define code blocks. Mixing tabs and spaces is forbidden in Python 3.
\`\`\`python
if True:
    print("Indented correctly!")
    if True:
        print("Double indented!")
\`\`\`

**2. Line Terminators:**
C-style languages use \`;\`. Python uses a simple **New Line**.

**3. Comments:**
• **Single-line:** Use \`#\`.
• **Docstrings:** Use triple quotes (\`"""\`) for documenting functions and classes. These are accessible via the \`__doc__\` attribute.

**4. The \`pass\` Statement:**
In Python, if a code block is syntactically required but you don't want to add code yet, use \`pass\`.
\`\`\`python
def future_function():
    pass # Placeholder
\`\`\`

---
**Technical Note:** Python 3 uses **UTF-8** by default for source files, allowing for international character sets.`,
        slug: "python-syntax",
        order: 3
    },
    {
        language: "Python",
        topic: "Python Variables",
        content: `**Variables and Dynamic Typing**
In Python, variables are labels that point to objects in memory.

**Dynamic Typing:**
You don't declare types. The type is inferred at runtime.
\`\`\`python
x = 10      # int
x = "Ten"   # string (successfully reassigned to a different type)
\`\`\`

**Variable Naming (PEP 8):**
• Use **snake_case** (e.g., \`user_login_count\`).
• Constants should be **UPPER_SNAKE_CASE** (e.g., \`PI_VALUE = 3.14\`).

**Multiple Assignment:**
\`\`\`python
a, b, c = 1, 2, "three"
x = y = z = 0 # Assign 0 to all three
\`\`\`

**Global vs. Local:**
Use the \`global\` keyword if you want to modify a global variable inside a function.

---
**Memory Concept:** Python uses **Reference Counting** and a **Garbage Collector** to manage memory automatically.`,
        slug: "python-variables",
        order: 4
    },
    {
        language: "Python",
        topic: "Python Data Types",
        content: `**Comprehensive Built-in Types**
Python collections and types are highly optimized and feature-rich.

**1. Numeric Types:**
• \`int\`: Unlimited precision integers (e.g., \`10**100\` works!).
• \`float\`: Double-precision decimals.
• \`complex\`: For mathematical imaging (\`3 + 5j\`).

**2. Boolean Type:**
\`True\` and \`False\` (Capitalized).

**3. Collection Types (The "Big Four"):**
• **List (\`[]\`):** Ordered, changeable, allows duplicates.
• **Tuple (\`()\`)**: Ordered, unchangeable, allows duplicates.
• **Set (\`{}\`):** Unordered, unindexed, no duplicates.
• **Dictionary (\`{:}\`):** Key-value pairs.

**Type Checking:**
\`\`\`python
print(type(42)) # <class 'int'>
print(isinstance(42, int)) # True
\`\`\`

---
**Pro Hint:** Use \`None\` for variables that are declared but have no value yet (Null equivalent).`,
        slug: "python-data-types",
        order: 5
    },
    {
        language: "Python",
        topic: "Python Numbers",
        content: `**Numeric Operations and Precision**
Python handles numbers with great flexibility.

**Integer Overflow:**
Unlike C or Java, Python \`int\` does not overflow. It expands to use as much memory as needed.
\`\`\`python
print(2 ** 1000) # Prints a massive number effortlessly
\`\`\`

**Division Nuances:**
• **Classic Division (\`/\`):** Always returns a float (e.g., \`10 / 2 = 5.0\`).
• **Floor Division (\`//\`):** Returns the integer result (e.g., \`10 // 3 = 3\`).
• **Modulo (\`%\`):** Returns the remainder (e.g., \`10 % 3 = 1\`).

**Scientific Notation:**
\`y = 12E4 # 120000.0\`

**Built-in Functions:**
• \`abs(-5)\`: Returns 5.
• \`pow(2, 3)\`: Returns 8.
• \`round(3.14159, 2)\`: Returns 3.14.

---
**Technical Insight:** Floating point numbers follow the **IEEE 754** standard.`,
        slug: "python-numbers",
        order: 6
    },
    {
        language: "Python",
        topic: "Python Strings",
        content: `**String Mastery and Formatting**
Strings in Python are immutable sequences of Unicode characters.

**String Literals:**
\`'Single'\`, \`"Double"\`, \`"""Triple for Multi-line"""\`.

**Slicing [start:end:step]:**
\`\`\`python
s = "Python"
print(s[0:2])  # 'Py'
print(s[::-1]) # 'nohtyP' (Reverse)
\`\`\`

**String Methods:**
• \`strip()\`: Remove whitespace.
• \`replace("a", "b")\`: Replace characters.
• \`split(",")\`: Convert string to list.
• \`join(["a", "b"])\`: Convert list to string.

**Modern Formatting (F-Strings):**
The preferred way since Python 3.6.
\`\`\`python
name = "Alice"
print(f"Hello, {name}!")
\`\`\`

---
**Warning:** Because strings are **immutable**, methods like \`upper()\` return a NEW string; they don't change the original!`,
        slug: "python-strings",
        order: 7
    },
    {
        language: "Python",
        topic: "Python Booleans",
        content: `**Boolean Logic and Truthiness**
Boolean values in Python reflect logical truths.

**Truth Value Testing:**
In Python, every object has an inherent "Truthiness".
• **False Values:** \`None\`, \`False\`, \`0\`, \`0.0\`, \`""\`, \`[]\`, \`()\`, \`{}\`.
• **True Values:** Almost everything else.

**Example Logic:**
\`\`\`python
# Empty list is False
data = []
if not data:
    print("List is empty!")
\`\`\`

**Boolean Functions:**
The \`bool()\` function can be used to test any value.
\`\`\`python
print(bool("Hello")) # True
print(bool(0))       # False
\`\`\`

---
**Logical Operators:** Python uses words (\`and\`, \`or\`, \`not\`) instead of symbols (\`&&\`, \`||\`, \`!\`).`,
        slug: "python-booleans",
        order: 8
    },
    {
        language: "Python",
        topic: "Python Operators",
        content: `**Operational logic in Python**
Python includes a vast range of operators to perform tasks efficiently.

**1. Arithmetic:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\`, \`**\` (Exponent), \`//\` (Floor div).

**2. Membership (\`in\`, \`not in\`):**
Checks if a value exists in a sequence (List, String, etc).
\`\`\`python
nums = [1, 2, 3]
print(2 in nums) # True
\`\`\`

**3. Identity (\`is\`, \`is not\`):**
Checks if two variables point to the same **memory location**.
\`\`\`python
x = [1, 2]
y = [1, 2]
print(x == y) # True (values are same)
print(x is y) # False (different memory addresses)
\`\`\`

**4. Logical:** \`and\`, \`or\`, \`not\`.

**5. Bitwise:** \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\`, \`>>\`.`,
        slug: "python-operators",
        order: 9
    },
    {
        language: "Python",
        topic: "Python Lists",
        content: `**The Versatile List**
Lists are Python's most used data structure for ordered collections.

**Features:**
• **Heterogeneous:** A single list can store different types (\`[1, "two", 3.0]\`).
• **Dynamic:** Size can change at runtime.

**Key Operations:**
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")    # Add to end
fruits.pop()               # Remove last
fruits.insert(1, "mango")  # Add at index
fruits.sort()              # Alphabetical sort
\`\`\`

**List Comprehensions (Powerful):**
A concise way to create lists.
\`\`\`python
squares = [x**2 for x in range(10)]
# Result: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

---
**Technical Note:** Lists are implemented as **Dynamic Arrays** in the Python C source code.`,
        slug: "python-lists",
        order: 10
    },
    {
        language: "Python",
        topic: "Python Tuples",
        content: `**Immutable Sequences: Tuples**
Tuples are like lists, but they cannot be changed after creation (**Immutable**).

**Why use Tuples?**
1. **Performance:** Tuples are slightly faster than lists.
2. **Safety:** Use them to store data that must not be modified.
3. **Dictionary Keys:** Tuples can be used as keys in a dictionary (Lists cannot).

**Unpacking Tuples:**
\`\`\`python
dimensions = (1920, 1080)
width, height = dimensions # Unpacking
\`\`\`

**The Comma Nuance:**
To create a tuple with one item, you MUST include a trailing comma.
\`t = (5,) # Tuple; without the comma, it's an int.\`

---
**Note:** While you can't change a tuple, if it contains a list, you *can* modify that list!`,
        slug: "python-tuples",
        order: 11
    },
    {
        language: "Python",
        topic: "Python Sets",
        content: `**Sets and Mathematical Logic**
A set is an unordered collection of unique elements.

**Key Operations:**
• **Intersection (\`&\`):** Common elements.
• **Union (\`|\`):** All elements from both.
• **Difference (\`-\`):** Elements in A but not in B.

**Example Code:**
\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b) # {3, 4}
print(a | b) # {1, 2, 3, 4, 5, 6}
\`\`\`

**Removing Duplicates:**
Sets are often used to deduplicate a list:
\`\`\`python
mylist = [1, 1, 2, 3, 3]
myset = list(set(mylist)) # [1, 2, 3]
\`\`\`

---
**Restriction:** Set elements must be "hashable" (immutable). You can't have a list inside a set.`,
        slug: "python-sets",
        order: 12
    },
    {
        language: "Python",
        topic: "Python Dictionaries",
        content: `**Mapping with Dictionaries**
Dictionaries store data in Key:Value pairs, similar to a real-world dictionary or an address book.

**Characteristics:**
• **Keys:** Must be unique and immutable (Strings, Numbers, Tuples).
• **Values:** Can be anything, even another dictionary.

**Usage Example:**
\`\`\`python
user = {
    "id": 101,
    "name": "Sarah",
    "roles": ["admin", "editor"]
}
print(user.get("name")) # "Sarah"
\`\`\`

**Looping:**
\`\`\`python
for key, value in user.items():
    print(f"{key}: {value}")
\`\`\`

---
**Performance Insight:** Dictionaries use a **Hash Table**, providing nearly instant lookup (O(1)) regardless of size!`,
        slug: "python-dictionaries",
        order: 13
    },
    {
        language: "Python",
        topic: "Python If-Else",
        content: `**Conditional Logic and Branching**
Conditional statements determine the flow of your program.

**Structures:**
• **if:** Executes if condition is True.
• **elif:** Alternative check if previous \`if\` failed.
• **else:** Fallback if all conditions failed.

**Example Logic:**
\`\`\`python
temp = 25
if temp > 30:
    print("Hot day")
elif temp > 20:
    print("Nice day")
else:
    print("Cold day")
\`\`\`

**Logical Composition:**
You can combine conditions using \`and\`, \`or\`, \`not\`.
\`if age > 18 and has_license:\`

---
**Ternary Operator:**
\`msg = "Access Granted" if authenticated else "Denied"\``,
        slug: "python-if-else",
        order: 14
    },
    {
        language: "Python",
        topic: "Python While Loops",
        content: `**Iteration: While Control**
A \`while\` loop repeats a block of code as long as a condition is True.

**Typical Usage:**
\`\`\`python
count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1
\`\`\`

**Control Keywords:**
• **break:** Exit the loop immediately.
• **continue:** Skip to the next iteration.
• **else:** Code that runs ONLY IF the loop finishes normally (without a \`break\`).

**Infinite Loop Pattern:**
\`\`\`python
while True:
    cmd = input("> ")
    if cmd == "exit":
        break
\`\`\`

---
**Note:** Python does not have a "do-while" loop. You can simulate it with a \`while True\` and a \`break\` at the end.`,
        slug: "python-while-loops",
        order: 15
    },
    {
        language: "Python",
        topic: "Python For Loops",
        content: `**Mastering the For Loop**
Python's \`for\` loop is an **Iterator** based loop, used to step through items in a collection.

**The \`range()\` Function:**
Generates a sequence of numbers.
• \`range(5)\`: 0, 1, 2, 3, 4.
• \`range(2, 10, 2)\`: 2, 4, 6, 8.

**Iterating with Index (enumerate):**
\`\`\`python
items = ["a", "b", "c"]
for index, val in enumerate(items):
    print(f"Item {index} is {val}")
\`\`\`

**Zipping Sequences:**
Looping through two lists at once.
\`\`\`python
names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
\`\`\`

---
**Best Practice:** Prefer \`for x in collection\` over \`for i in range(len(collection))\`. It's more Pythonic!`,
        slug: "python-for-loops",
        order: 16
    },
    {
        language: "Python",
        topic: "Python Functions",
        content: `**Functional Programming in Python**
Functions are the fundamental units of reusable code in Python.

**Defining and Calling:**
\`\`\`python
def calculate_area(width, height):
    """Calculate the area of a rectangle."""
    return width * height

a = calculate_area(10, 5) # 50
\`\`\`

**Arguments Patterns:**
• **Positional:** Standard matching based on order.
• **Keyword:** Explicitly naming parameters (\`calculate_area(height=5, width=10)\`).
• **Default Values:** \`def greet(name="Guest"):\`.
• **Arbitrary (\*args, \*\*kwargs):** Pass unknown number of arguments.

**Scope (LEGB Rule):**
Python looks for variables in this order: **L**ocal, **E**nclosing, **G**lobal, **B**uilt-in.

---
**Pro Tip:** Use type hints (C++-style) for better IDE support:
\`def sum(a: int, b: int) -> int: return a + b\``,
        slug: "python-functions",
        order: 17
    },
    {
        language: "Python",
        topic: "Python Lambda",
        content: `**The Power of Lambdas**
A lambda function is a small, one-line anonymous function defined without a name.

**Syntax:**
\`lambda arguments : expression\`

**Common Use Case (Sorting):**
\`\`\`python
students = [("Alice", 88), ("Bob", 95), ("Charlie", 80)]
# Sort by grade
students.sort(key=lambda x: x[1])
\`\`\`

**Functional Helpers:**
Lambdas are often used with \`map()\`, \`filter()\`, and \`reduce()\`.
\`\`\`python
nums = [1, 2, 3, 4]
evens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]
\`\`\`

---
**Caution:** Lambdas should only be used for simple logic. If the code requires more than one line, define a regular function using \`def\`.`,
        slug: "python-lambda",
        order: 18
    },
    {
        language: "Python",
        topic: "Python Classes and Objects",
        content: `**Object Oriented Python**
Python is purely object-oriented. Everything is an object, but we can define our own blueprints using **Classes**.

**The \`__init__\` Method:**
This is the constructor. It initializes the object's attributes when an instance is created.

**The \`self\` Parameter:**
A reference to the current instance of the class. It is used to access variables that belong to the class.

**Example Implementation:**
\`\`\`python
class Robot:
    def __init__(self, name, model):
        self.name = name
        self.model = model
    
    def greet(self):
        print(f"I am {self.name}, model {self.model}.")

bot1 = Robot("Alpha", "v2.1")
bot1.greet()
\`\`\`

---
**Inheritance:**
Python supports multiple inheritance!
\`class Drone(Robot, FlyingMachine): ...\``,
        slug: "python-classes",
        order: 19
    },
    {
        language: "Python",
        topic: "Python Modules",
        content: `**Modular Python and Packages**
A module is just a file ending in \`.py\`. A package is a collection of modules (a folder with an \`__init__.py\` file).

**Importing Patterns:**
• \`import math\`: Get the whole module. Use \`math.sqrt()\`.
• \`from math import pi\`: Import specific object. Use \`pi\` directly.
• \`import pandas as pd\`: Import with an alias (industry standard).

**Package Management (pip):**
Pip is the package installer for Python.
\`\`\`bash
pip install requests
\`\`\`

**Standard Library Gems:**
• \`os\`: Operating system interactions.
• \`sys\`: System-specific parameters.
• \`datetime\`: Handling dates and times.
• \`json\`: Parsing JSON data.

---
**Technical Note:** Python searches for modules in the current directory, then in paths listed in \`sys.path\`.`,
        slug: "python-modules",
        order: 20
    }
];

const seedPython = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for Expanded 20 Python topics seeding (GFG Style)...");

        // Remove old Python topics to ensure exactly 20
        await Topic.deleteMany({ language: "Python" });
        console.log("Cleared existing Python topics.");

        await Topic.insertMany(pythonTopics);
        console.log("Successfully seeded 20 highly detailed Python topics!");

        await mongoose.connection.close();
        console.log("Connection closed.");
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedPython();
