const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const cppTopics = [
  {
    language: "C++",
    topic: "Introduction to C++",
    content: `**What is C++?**
C++ is a high-performance, cross-platform language developed by Bjarne Stroustrup at Bell Labs in 1979, originally named "C with Classes". It is an extension of the C language and allows programmers high-level control over system resources and memory.

**History and Evolution:**
• **1979:** Work started on "C with Classes".
• **1983:** Renamed to C++ (the \`++\` is the increment operator in C).
• **1998:** First standard version (C++98).
• **Modern C++:** Since C++11, the language has evolved rapidly with versions C++14, C++17, and C++20, adding features like lambda expressions and concepts.

**Key Features:**
• **Object-Oriented (OOP):** Focuses on objects and classes for better code organization.
• **Fast Execution:** Compiled directly to machine code, making it ideal for games and system software.
• **Standard Template Library (STL):** A powerful library of classes and functions for data structures and algorithms.
• **Memory Management:** Gives developers direct control through pointers and references.

**Example Code:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // The main function is where execution begins
    cout << "Welcome to advanced C++ programming!" << endl;
    return 0;
}
\`\`\`

---
**Why C++?**
It bridges the gap between low-level hardware interaction and high-level abstract programming. It is the language behind browsers (Chrome), operating systems (Windows), and high-end games (Unreal Engine).`,
    slug: "introduction-to-cpp",
    order: 1
  },
  {
    language: "C++",
    topic: "C++ Environment Setup",
    content: `**Professional Environment Setup**
To build industrial-grade applications, you need a stable C++ toolchain.

**1. Choosing an IDE:**
• **Visual Studio (Windows):** The industry standard for Windows development.
• **CLion (Cross-platform):** Intelligent IDE with excellent refactoring tools.
• **VS Code:** Lightweight and versatile. Requires the **C/C++ Extension** and a compiler.
• **Xcode (macOS):** Essential for Apple platform development.

**2. Compilers (The Engine):**
• **GCC/G++:** The GNU Compiler Collection, standard for Linux.
• **Clang:** Developed by Apple/LLVM, known for fast compilation and clear error messages.
• **MSVC:** The Microsoft Visual C++ compiler.

**Terminal Setup (MinGW/GCC on Windows):**
1. Install MinGW-w64.
2. Add the \`bin\` directory to your **System PATH**.
3. Verify: Open CMD and type \`g++ --version\`.

**How it works:**
C++ is a **Compiled** language. Your code (\`.cpp\`) passes through:
1. **Preprocessor:** Handles #directives.
2. **Compiler:** Turns C++ into Assembly.
3. **Assembler:** Turns Assembly into Machine Code (Object files).
4. **Linker:** Combines object files into an Executable (\`.exe\`).`,
    slug: "cpp-environment-setup",
    order: 2
  },
  {
    language: "C++",
    topic: "C++ Basic Syntax",
    content: `**Anatomy of a C++ Program**
Understanding the basic structure is crucial before moving to complex logic.

\`\`\`cpp
#include <iostream>  // Header for input/output
using namespace std; // Namespace to avoid typing std:: constantly

int main() {
  // This is a comment
  cout << "Learning Syntax"; // Statement
  return 0; // Successful exit
}
\`\`\`

**Core Components:**
• **#include <iostream>:** Directs the preprocessor to include the Standard I/O library.
• **Namespace \`std\`:** The standard library uses the \`std\` namespace. Without \`using namespace std;\`, you'd write \`std::cout\`.
• **int main():** The "Entry Point". Every program must have exactly one.
• **Statement Terminator:** Every instruction must end with a semicolon (\`;\`).

---
**Naming Rules for Variables:**
• Must start with a letter or underscore (\`_\`).
• Cannot contain spaces or special characters (\`!\`, \`#\`, etc.).
• Case Sensitive: \`Age\` and \`age\` are different.
• Keywords (like \`int\`, \`class\`) cannot be used as names.`,
    slug: "cpp-basic-syntax",
    order: 3
  },
  {
    language: "C++",
    topic: "C++ Variables",
    content: `**Data Storage: Variables**
Variables are containers that reserve memory locations to store data.

**Primitive Data Types:**
• **int:** Integers (e.g., \`10\`). Usually 4 bytes.
• **double:** Floating point (e.g., \`19.99\`). 8 bytes, high precision.
• **float:** Single precision decimal. 4 bytes.
• **char:** Single letter/symbol (e.g., \`'A'\`). 1 byte.
• **bool:** Logical values (\`true\` or \`false\`). 1 byte.
• **string:** A sequence of characters (standard library object).

**Declaration and Initialization:**
\`\`\`cpp
int age;          // Declaration
age = 25;         // Assignment
int score = 100;  // Initialization
\`\`\`

**L-values and R-values:**
• **L-value:** An expression that refers to a memory location (Left side of \`=\`).
• **R-value:** Temporary data value (Right side of \`=\`).

---
**Variable Modifiers:**
• **const:** Makes a variable read-only.
• **static:** Retains value between function calls.
• **extern:** Declares a variable defined in another file.`,
    slug: "cpp-variables",
    order: 4
  },
  {
    language: "C++",
    topic: "C++ User Input",
    content: `**Standard Input and Output**
I/O in C++ is managed via **streams** (sequences of bytes).

**1. Output (cout):**
Use the insertion operator (\`<<\`) to push data to the console.
\`cout << "Value: " << myVar;\`

**2. Input (cin):**
Use the extraction operator (\`>>\`) to pull data from the keyboard into a variable.
\`\`\`cpp
int age;
cout << "Enter age: ";
cin >> age;
\`\`\`

**Handling Spaces (getline):**
The \`cin\` operator stops reading at the first space. To read a full set of words (like a full name), use \`getline()\`.
\`\`\`cpp
string name;
cout << "Enter full name: ";
getline(cin, name);
\`\`\`

---
**Cin Caveat:** When mixing \`cin >>\` and \`getline()\`, you might need to use \`cin.ignore()\` to clear the newline character from the buffer.`,
    slug: "cpp-user-input",
    order: 5
  },
  {
    language: "C++",
    topic: "C++ Data Types",
    content: `**Advanced Data Type Concepts**
C++ is a **statically-typed** language, meaning variable types are checked at compile time.

**Numerical Range Modifiers:**
You can modify the range of \`int\` and \`char\`:
• **signed:** Positive and negative.
• **unsigned:** Positive only (doubles the positive range).
• **short:** Smaller memory footprint.
• **long:** Large memory footprint (e.g., \`long long\` for huge numbers).

**Memory Size Verification:**
Different machines might allocate different sizes. Use \`sizeof\`.
\`\`\`cpp
cout << "Size of int: " << sizeof(int) << " bytes";
\`\`\`

**Type Casting:**
Converting one type to another. 
• **Implicit:** Automatic conversion (e.g., int to double).
• **Explicit:** Using \`static_cast<type>(value)\`.

---
**Note:** Modern C++ often uses the \`auto\` keyword to let the compiler deduce the type based on the initialization value.`,
    slug: "cpp-data-types",
    order: 6
  },
  {
    language: "C++",
    topic: "C++ Operators",
    content: `**The Engine of Logic: Operators**
Operators are symbols that perform specific mathematical or logical transformations.

**1. Arithmetic Operators:**
\`+\`, \`-\`, \`*\`, \`/\`. 
**Modulo (%):** Returns the remainder of division (Only for integers).
\`\`\`cpp
int rem = 10 % 3; // Result: 1
\`\`\`

**2. Relational Operators:**
Compare two values and return a bool: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.

**3. Logical Operators:**
Combine bools: \`&&\` (AND), \`||\` (OR), \`!\` (NOT).

**4. Bitwise Operators:**
Operate on binary bits: \`&\`, \`|\`, \`^\` (XOR), \`~\` (Complement), \`<<\`, \`>>\`.

**5. Assignment:**
\`=\`, \`+=\`, \`-=\`.

**Operator Precedence:**
Determines which operation is executed first (e.g., multiplication before addition). Use parentheses \`()\` to enforce your own order.`,
    slug: "cpp-operators",
    order: 7
  },
  {
    language: "C++",
    topic: "C++ Strings",
    content: `**Strings and Text Processing**
A C++ string contains a sequence of characters, as part of the \`std\` namespace.

**String Operations:**
• **Concatenation:** \`string full = str1 + str2;\`
• **Appending:** \`str1.append(str2);\` (Faster for large strings).
• **Access:** \`str[0]\` returns the first character.
• **Length:** \`str.length()\` or \`str.size()\`.

**Special Characters (Escape Sequences):**
To include restricted characters in a string:
• \`\\"\` : Double quote
• \`\\'\` : Single quote
• \`\\n\` : New line
• \`\\t\` : Tab

**Example Code:**
\`\`\`cpp
#include <string>
string text = "Hello \\"World\\"";
cout << text.substr(0, 5); // Outputs "Hello"
\`\`\`

---
**Performance Tip:** Use \`std::string_view\` (C++17) for read-only string access without copying memory.`,
    slug: "cpp-strings",
    order: 8
  },
  {
    language: "C++",
    topic: "C++ Math",
    content: `**Computational C++ (cmath)**
The \`<cmath>\` library provides advanced mathematical functions.

**Common Functions:**
• **sqrt(x):** Square root.
• **pow(x, y):** x raised to the power y.
• **abs(x):** Absolute value.
• **ceil(x) / floor(x):** Rounding up or down.
• **sin, cos, tan:** Trigonometric operations (in radians).
• **log(x):** Natural logarithm.

**Example Calculation:**
\`\`\`cpp
#include <cmath>
double result = pow(2, 5); // 2^5 = 32
double rooted = sqrt(144); // 12
\`\`\`

---
**Boolean Logic in Math:**
C++ includes \`std::min()\` and \`std::max()\` in the \`<algorithm>\` header to find the smallest or largest of two values.`,
    slug: "cpp-math",
    order: 9
  },
  {
    language: "C++",
    topic: "C++ Booleans",
    content: `**The Logic Foundation: Booleans**
Booleans name after George Boole, representing only two states: true or false.

**Types of Bool:**
• **Keywords:** \`true\` and \`false\`.
• **Representation:** Internally, \`true\` is \`1\` and \`false\` is \`0\`.

**Conditional Logic:**
Booleans are the heart of \`if\` and \`while\` statements.
\`\`\`cpp
bool isRaining = true;
if (isRaining) {
    cout << "Take an umbrella";
}
\`\`\`

**Bool as Integer:**
\`\`\`cpp
bool b = true;
int i = b; // i becomes 1
\`\`\`

---
**Note:** In C++, any numeric value other than 0 is considered **True** in a conditional context.`,
    slug: "cpp-booleans",
    order: 10
  },
  {
    language: "C++",
    topic: "C++ Conditionals",
    content: `**Deep Dive into Conditionals**
Control flow structures let your program react to data.

**1. The if-else Ladder:**
Used for multiple exclusive conditions.
\`\`\`cpp
if (grade >= 90) { ... }
else if (grade >= 80) { ... }
else { ... }
\`\`\`

**2. Ternary Operator (Inline If):**
A concise way to assign values.
\`string result = (age >= 18) ? "Voter" : "Non-Voter";\`

**3. Nested Conditionals:**
An \`if\` inside another \`if\`.
\`\`\`cpp
if (isLoggedIn) {
    if (isAdmin) { ... }
}
\`\`\`

---
**Common Mistake:** Confusing \`=\` (assignment) with \`==\` (comparison). 
\`if (x = 5)\` will always be true because it assigns 5 to x, and 5 is non-zero!`,
    slug: "cpp-conditionals",
    order: 11
  },
  {
    language: "C++",
    topic: "C++ Switch",
    content: `**Switch Case Mechanics**
A fast alternative to multiple \`if-else\` when comparing a single variable against many discrete values.

**Rules of Switch:**
• **Integrals Only:** The expression must result in an integer (int, char, enum). No strings or floats.
• **Break Statement:** Essential to prevent "fall-through" where subsequent cases execute unexpectedly.
• **Default Case:** Acts as the catch-all "else".

**Example:**
\`\`\`cpp
int day = 4;
switch (day) {
  case 1: cout << "Monday"; break;
  case 7: cout << "Sunday"; break;
  default: cout << "Workday";
}
\`\`\`

---
**Pro Tip:** If you want multiple cases to run the same code, you can omit the \`break\` intentionally (Fall-through pattern).`,
    slug: "cpp-switch",
    order: 12
  },
  {
    language: "C++",
    topic: "C++ While Loop",
    content: `**Iteration: While and Do-While**

**1. While Loop:**
Checked *before* the first execution. If the condition is false initially, the code never runs.
\`\`\`cpp
int count = 0;
while (count < 10) {
    cout << count++;
}
\`\`\`

**2. Do-While Loop:**
Checked *after* the execution. Guarantees that the code block runs **at least once**.
\`\`\`cpp
char choice;
do {
    cout << "Continue? (y/n): ";
    cin >> choice;
} while (choice == 'y');
\`\`\`

**Loop Safety:**
Always ensure the condition eventually becomes false to avoid an **Infinite Loop**, which can freeze your computer.`,
    slug: "cpp-while-loop",
    order: 13
  },
  {
    language: "C++",
    topic: "C++ For Loop",
    content: `**Iterating with the For Loop**
The most standard loop when you know the number of iterations in advance.

**Standard Syntax:**
\`for (int i=0; i<10; i++) { ... }\`
1. **Initialize:** \`int i=0\`
2. **Condition:** \`i<10\`
3. **Increment:** \`i++\`

**Modern For-Each (Range-based):**
Introduced in C++11, this is the safest way to iterate over collections.
\`\`\`cpp
int scores[] = {10, 20, 30};
for (int s : scores) {
    cout << s << " ";
}
\`\`\`

**Nested For Loops:**
Essential for 2D structures like matrices or grid-based games.
\`\`\`cpp
for(int i=0; i<3; i++) {
    for(int j=0; j<3; j++) {
        // ...
    }
}
\`\`\``,
    slug: "cpp-for-loop",
    order: 14
  },
  {
    language: "C++",
    topic: "C++ Break and Continue",
    content: `**Loop Control: Break and Continue**

**1. Break:**
Immediately "breaks" out of the loop.
\`\`\`cpp
for (int i=0; i<100; i++) {
    if (i == 5) break; // Exits loop
    cout << i;
}
\`\`\`

**2. Continue:**
"Continues" to the next iteration, skipping the rest of the current block.
\`\`\`cpp
for (int i=1; i<=5; i++) {
    if (i == 3) continue; // Skip 3
    cout << i;
}
// 1 2 4 5
\`\`\`

---
**Warning:** Be careful when using \`continue\` in \`while\` loops. If you skip the "increment" step, you'll create an infinite loop!`,
    slug: "cpp-break-continue",
    order: 15
  },
  {
    language: "C++",
    topic: "C++ Arrays",
    content: `**Sequence Storage: Arrays**
Arrays store multiple elements of the same type in contiguous memory.

**Declaration:**
\`int grades[10]; // 10 integers\`

**Memory Mapping:**
Indices start at **0**.
\`\`\`cpp
int items[] = {10, 20, 30, 40};
cout << items[2]; // Outputs 30
\`\`\`

**Size of Array:**
Because it's a fixed size, use \`sizeof(arr) / sizeof(arr[0])\` to find the count.

**Multidimensional Arrays:**
\`int matrix[2][3] = { {1,2,3}, {4,5,6} };\`

---
**Caution:** C++ does not perform **bounds checking**. Browsing \`items[10]\` when size is 4 will lead to "Undefined Behavior" (crashes or data corruption).`,
    slug: "cpp-arrays",
    order: 16
  },
  {
    language: "C++",
    topic: "C++ Pointers and References",
    content: `**Advanced Memory Layer: Pointers**

**1. References (&):**
An alias for an existing variable.
\`\`\`cpp
int original = 10;
int &alias = original;
alias = 20; // original is now 20
\`\`\`

**2. Pointers (*):**
A variable holding the memory address of another.
\`\`\`cpp
int score = 100;
int* ptr = &score; // Reference
cout << *ptr; // Dereference (Output: 100)
\`\`\`

**Nullptr:**
In modern C++, always use \`nullptr\` for uninitialized pointers instead of \`0\` or \`NULL\`.

**Why use them?**
• Dynamic memory allocation (Heap).
• Passing large structures to functions efficiently (by reference).
• Building data structures like Linked Lists and Trees.`,
    slug: "cpp-pointers-and-references",
    order: 17
  },
  {
    language: "C++",
    topic: "C++ Functions",
    content: `**Modularizing Code: Functions**
Functions are reusable units of logic.

**Definition Structure:**
\`\`\`cpp
int addNumbers(int a, int b) {
    return a + b;
}
\`\`\`

**Return Types:**
• **void:** No return value.
• **Primitive/Object:** Returns one value.

**Function Overloading:**
C++ allows multiple functions with the same name but different parameters.
\`\`\`cpp
int sum(int a, int b);
double sum(double a, double b);
\`\`\`

---
**Scope:** Variables declared inside a function are **Local** and disappear once the function finishes.`,
    slug: "cpp-functions",
    order: 18
  },
  {
    language: "C++",
    topic: "C++ OOP Concepts",
    content: `**The OOP Revolution**
Object-Oriented Programming (OOP) is the core philosophy of C++.

**Four Pillars of OOP:**
1. **Encapsulation:** Grouping data and methods into a single unit (Class) and hiding internal details.
2. **Abstraction:** Highlighting essential features and hiding complex implementation.
3. **Inheritance:** Creating new classes based on existing ones (Code reuse).
4. **Polymorphism:** One interface, multiple forms (e.g., a "Shape" can be a "Circle" or "Square").

**Class vs. Object:**
• **Class:** The blueprint (e.g., "Architecture Plan").
• **Object:** The reality (e.g., "The actual House").`,
    slug: "cpp-oop-concepts",
    order: 19
  },
  {
    language: "C++",
    topic: "C++ Classes and Objects",
    content: `**Implementing Classes**
A class is a user-defined data type that contains its own data members and member functions.

**Basic Syntax:**
\`\`\`cpp
class Profile {
  public: // Access Specifier
    string username;
    void printName() {
        cout << username;
    }
};

int main() {
    Profile user1; // Creating object
    user1.username = "Alice";
    user1.printName();
}
\`\`\`

**Access Specifiers:**
• **public:** Accessible everywhere.
• **private:** Accessible only inside the class (Default).
• **protected:** Accessible in this class and inherited classes.

**Constructors:**
Special functions that run automatically when an object is created. Usually used to initialize data.`,
    slug: "cpp-classes-and-objects",
    order: 20
  }
];

const seedCPP = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for Expanded 20 C++ topics seeding (GFG Style)...");

    // Remove old C++ topics to ensure exactly 20
    await Topic.deleteMany({ language: "C++" });
    console.log("Cleared existing C++ topics.");

    await Topic.insertMany(cppTopics);
    console.log("Successfully seeded 20 highly detailed C++ topics!");

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedCPP();
