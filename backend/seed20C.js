const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const cTopics = [
  {
    language: "C",
    topic: "Introduction to C",
    content: `**What is C?**
C is a powerful general-purpose programming language. It can be used to develop software like operating systems, databases, compilers, and so on. C programming is an excellent language to learn to program for beginners.

**History of C:**
• **Origin:** Developed by Dennis Ritchie at Bell Labs in 1972.
• **Successor to B:** It was created as a successor to the B language.
• **UNIX:** Much of the UNIX operating system was rewritten in C.

**Key Features of C:**
• **Mid-Level Language:** It has both the power of low-level languages (like assembly) and the ease of high-level languages.
• **Structured Programming:** Allows breaking programs into parts using functions.
• **Rich Library:** Provides many built-in functions that assist in development.
• **Extensible:** A C program can adopt new features by adding libraries.
• **Fast and Efficient:** Direct memory access and minimal runtime overhead make it extremely fast.

**Example Code:**
\`\`\`c
#include <stdio.h>

/* Every C program starts with the main() function */
int main() {
    printf("Welcome to the world of C Programming!\\n");
    return 0; // Indicates successful execution
}
\`\`\`

---
**Why Learn C?**
Learning C helps you understand how a computer works internally. It provides a strong foundation for understanding memory management, pointers, and data structures.`,
    slug: "introduction-to-c",
    order: 1
  },
  {
    language: "C",
    topic: "C Environment Setup",
    content: `**Setting up C Environment**
To start C programming, you need a Text Editor and a C Compiler.

**1. Text Editors:**
You can use a simple text editor like Notepad, or a feature-rich Integrated Development Environment (IDE):
• **VS Code:** Highly recommended. Use with the C/C++ extension.
• **Code::Blocks:** A free, open-source C/C++ IDE.
• **Dev-C++:** A lightweight IDE for beginners.

**2. C Compilers:**
Compilers convert your C code into binary (.exe or machine code).
• **GCC (GNU Compiler Collection):** The industry standard for Linux and Windows (via MinGW).
• **Clang:** A modern, fast compiler.
• **MSVC:** Microsoft's C compiler included with Visual Studio.

**Installation (Windows - MinGW/GCC):**
1. Download MinGW-w64 from a source like SourceForge.
2. Install and add the \`bin\` folder to your system's PATH environment variable.
3. Open a terminal and check version: \`gcc --version\`.

**How Compiling Works:**
• **Preprocessor:** Processes #include and #define.
• **Compiler:** Translates C to Assembly.
• **Assembler:** Translates Assembly to Machine Code (Object files).
• **Linker:** Combines object files and libraries into an Executable.`,
    slug: "c-environment-setup",
    order: 2
  },
  {
    language: "C",
    topic: "C Program Structure",
    content: `**Anatomy of a C Program**
A C program follows a specific structure that the compiler expects.

**1. Preprocessor Commands:**
Lines starting with \`#\` are processed first.
\`#include <stdio.h>\` tells the compiler to include input/output capabilities.

**2. Global Declarations:**
Variables or function prototypes defined outside any function.

**3. Main Function:**
\`int main() { ... }\` - This is the entry point. Execution starts and ends here.

**4. Statements and Expressions:**
Specific instructions like \`printf("Hello");\`.

**5. Comments:**
• Single-line: \`// comment\`
• Multi-line: \`/* comment */\`

**Structure Example:**
\`\`\`c
#include <stdio.h>

// Global variable (optional)
int globalVar = 10;

int main() {
    /* Local variable */
    int localVar = 5;
    
    printf("Global: %d, Local: %d\\n", globalVar, localVar);
    
    return 0;
}
\`\`\`

---
**Important Note:** Every statement in C must end with a semicolon (\`;\`). Missing a semicolon is the most common beginner error!`,
    slug: "c-program-structure",
    order: 3
  },
  {
    language: "C",
    topic: "C Variables",
    content: `**Understanding Variables in C**
A variable is a name given to a storage area that our programs can manipulate.

**Variable Declaration vs. Definition:**
• **Declaration:** Tells the compiler about the variable name and type (e.g., \`extern int x;\`).
• **Definition:** Allocates memory and optionally sets a value (e.g., \`int x = 10;\`).

**Variable Types:**
• **Local:** Declared inside an opening brace \`{\`. Only accessible within that block.
• **Global:** Declared outside functions. Accessible everywhere.
• **Static:** Retains its value even after leaving the scope.

**Lvalue and Rvalue:**
• **Lvalue:** An expression that refers to a memory location (e.g., variable names). They can appear on the left of an assignment.
• **Rvalue:** The data value stored at some address (e.g., literals). They appear on the right.

**Declaration Example:**
\`\`\`c
int age = 20;        // 'age' is an lvalue, '20' is an rvalue
float height;        // Declaration without initialization
char grade = 'A';    // Character constant
\`\`\`

---
**Naming Conventions:**
Always use meaningful names (e.g., \`studentAge\` instead of \`sa\`). Use camelCase or snake_case consistently.`,
    slug: "c-variables",
    order: 4
  },
  {
    language: "C",
    topic: "C Data Types",
    content: `**Data Types Deep Dive**
Data types in C classify how the data is stored and what operations can be performed.

**1. Primary (Basic) Types:**
• **char:** Smallest addressable unit, stores one character (1 byte).
• **int:** Typical integer for the processor (2 or 4 bytes).
• **float:** Single-precision decimal (4 bytes).
• **double:** Double-precision decimal (8 bytes).

**2. Derived Types:**
• **Arrays:** Collections of same type.
• **Pointers:** Variables storing addresses.
• **Structures:** User-defined collections of different types.

**3. Type Modifiers:**
You can change the size or range of basic types:
• **signed / unsigned:** Handling positive and negative values.
• **short / long:** Changing the memory allocation size.

**Example: unsigned int**
\`unsigned int positiveOnly = 4000000000;\`

**Memory Size Table (Typical 32-bit):**
| Type | Size | Range |
| :--- | :--- | :--- |
| char | 1 byte | -128 to 127 |
| int | 4 bytes | -2B to 2B |
| float | 4 bytes | 1.2E-38 to 3.4E+38 |

---
**Tip:** Use \`sizeof(type)\` to check exact sizes on your specific system.`,
    slug: "c-data-types",
    order: 5
  },
  {
    language: "C",
    topic: "C Constants",
    content: `**Constants and Literals**
Constants are fixed values that do not change.

**1. Using the 'const' Keyword:**
This keeps the variable type-safe.
\`\`\`c
const float PI = 3.14159;
// PI = 3.0; // ERROR: assignment to read-only variable
\`\`\`

**2. Using #define (Macro):**
These are replaced by the preprocessor before compilation. No memory is allocated for them.
\`\`\`c
#define MAX_SCORE 100
\`\`\`

**3. Enumerations (enum):**
A set of named integer constants.
\`\`\`c
enum Weekday {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
enum Weekday today = Wed; // today is 3
\`\`\`

**Literal Types:**
• **Integer Literals:** \`212\`, \`215u\`, \`0xFEE\`
• **Float Literals:** \`3.14\`, \`1.5e-10\`
• **String Literals:** \`"Hello World"\`
• **Character Literals:** \`'A'\`, \`'\\n'\` (escape sequences)

---
**Best Practice:** Use \`const\` instead of \`#define\` where possible because \`const\` values are visible to the debugger.`,
    slug: "c-constants",
    order: 6
  },
  {
    language: "C",
    topic: "C Operators",
    content: `**Comprehensive Guide to C Operators**
Operators are symbols used to perform operations on variables (operands).

**1. Arithmetic Operators:**
\`+\` Addition, \`-\` Subtraction, \`*\` Multiplication, \`/\` Division (integer/float), \`%\` Modulo (remainder).

**2. Relational Operators (Results in bool 1/0):**
\`==\` Equal, \`!=\` Not Equal, \`>\` Greater, \`<\` Less, \`>=\`, \`<=\`.

**3. Logical Operators:**
\`&&\` AND (Both true), \`||\` OR (Either true), \`!\` NOT (Inverse).

**4. Bitwise Operators:**
Operate on bits: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\` (Left shift), \`>>\` (Right shift).

**5. Assignment Operators:**
\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`.

**6. Increment and Decrement:**
• **Post-increment (\`i++\`):** Use value then increment.
• **Pre-increment (\`++i\`):** Increment value then use.

**Example Comparison:**
\`\`\`c
int a = 10;
int b = (a++ == 10); // true (b=1), then a becomes 11
int c = (++a == 12); // true (c=1), a becomes 12
\`\`\`

---
**Caution:** Be careful with operator precedence (the order in which they are evaluated). Use parentheses \`()\` to be explicit.`,
    slug: "c-operators",
    order: 7
  },
  {
    language: "C",
    topic: "C Conditionals",
    content: `**Control Flow: If-Else Statements**
Decision making allows a program to execute different paths of code.

**1. Simple If:**
Runs if the expression is non-zero.
\`\`\`c
if (score > 50) {
    printf("Passed");
}
\`\`\`

**2. If-Else:**
Provides an alternative path.
\`\`\`c
if (age >= 18) {
    printf("Adult");
} else {
    printf("Minor");
}
\`\`\`

**3. If-Else-If Ladder:**
Checks multiple conditions in sequence.

**4. Nested If:**
An \`if\` inside another \`if\`.

**5. Ternary Operator (Short If-Else):**
\`condition ? expression1 : expression2\`

**Example Logic:**
\`\`\`c
int a = 10, b = 20;
int max = (a > b) ? a : b; // max = 20
\`\`\`

---
**Note:** In C, \`0\` is treated as **False**, and any non-zero value is **True**. This is why \`if (5) { ... }\` always runs.`,
    slug: "c-conditionals",
    order: 8
  },
  {
    language: "C",
    topic: "C Switch Case",
    content: `**Switch Statement Strategy**
The \`switch\` statement is a cleaner alternative to multi-section \`if-else\` when comparing a variable to multiple constant values.

**Syntax Key points:**
• **Expression:** Must result in an integer (int, char, enum). Floats are NOT allowed.
• **Case Label:** Must be a constant or literal.
• **Break:** Exits the switch. Without it, execution "falls through" to the next case.
• **Default:** Executes if no case matches.

**Example of Fall-through:**
\`\`\`c
char grade = 'B';
switch(grade) {
    case 'A':
    case 'B':
    case 'C':
        printf("You passed!\\n"); // Prints for A, B, or C
        break;
    default:
        printf("Fail\\n");
}
\`\`\`

**When to use Switch?**
• Use it when you have a large number of fixed options.
• Use it for Menu-driven programs (e.g., "Enter 1 for Start, 2 for Exit").

---
**Caution:** Forgetting \`break\` is a logical error that causes the program to execute unintentional code blocks!`,
    slug: "c-switch-case",
    order: 9
  },
  {
    language: "C",
    topic: "C While Loop",
    content: `**While and Do-While Loops**
Loops repeat a block of code until a condition is met.

**1. While Loop (Entry-controlled):**
Checks the condition *before* executing the body. If the condition is false initially, the body NEVER runs.
\`\`\`c
int i = 5;
while (i > 0) {
    printf("%d ", i--);
}
// Output: 5 4 3 2 1
\`\`\`

**2. Do-While Loop (Exit-controlled):**
Executes the body *at least once*, even if the condition is false, because the check happens at the bottom.
\`\`\`c
int i = 0;
do {
    printf("This runs once.");
} while (i > 0);
\`\`\`

**Common Infinite Loop:**
\`\`\`c
while (1) {
    // This runs forever unless 'break' is called
}
\`\`\`

---
**Note:** Use \`while\` when the number of iterations is unknown and depends on a dynamic condition.`,
    slug: "c-while-loop",
    order: 10
  },
  {
    language: "C",
    topic: "C For Loop",
    content: `**Mastering the For Loop**
The \`for\` loop is the most compact and widely used loop when you know exactly how many iterations you need.

**The Parts of a For Loop:**
1. **Initialization:** Runs once at the start (e.g., \`int i = 0\`).
2. **Condition:** Checked before every iteration. If false, the loop ends.
3. **Increment/Decrement:** Updates the counter after the body runs.

**Example: Summing Numbers**
\`\`\`c
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
printf("Sum of first 10 numbers is: %d", sum);
\`\`\`

**Multiple Expressions:**
You can initialize or update multiple variables by separating them with commas.
\`for (int i = 0, j = 10; i < j; i++, j--) { ... }\`

**Nested For Loops:**
Commonly used for multidimensional data like 2D arrays or printing patterns.
\`\`\`c
for(int i=1; i<=3; i++) {
    for(int j=1; j<=3; j++) {
        printf("* ");
    }
    printf("\\n");
}
\`\`\`

---
**Tip:** In modern C (C99+), you can declare the loop variable inside the initialization part.`,
    slug: "c-for-loop",
    order: 11
  },
  {
    language: "C",
    topic: "C Break and Continue",
    content: `**Jump Statements: Break and Continue**
These provide fine-grained control over the flow of loops.

**1. Break:**
Immediately terminates the innermost loop or switch statement.
\`\`\`c
for (int i = 0; i < 100; i++) {
    if (i == 5) break; 
    printf("%d ", i);
}
// Output: 0 1 2 3 4
\`\`\`

**2. Continue:**
Skips the rest of the current iteration and jumps to the next condition check/update.
\`\`\`c
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    printf("%d ", i);
}
// Output: 1 2 4 5  (3 is skipped)
\`\`\`

**3. Return:**
Terminates the entire function, not just the loop.

---
**Note:** Overusing \`break\` and \`continue\` can sometimes make code harder to read. Use them logically to handle edge cases or early exits.`,
    slug: "c-break-continue",
    order: 12
  },
  {
    language: "C",
    topic: "C Arrays",
    content: `**Arrays and Memory**
An array is a fixed-size sequence of elements of the same type stored in contiguous memory locations.

**Declaration and Initialization:**
\`\`\`c
int numbers[5]; // Allocated but contains garbage values
int scores[3] = {90, 85, 88}; // Fully initialized
int list[] = {1, 2, 3}; // Size automatically becomes 3
\`\`\`

**Accessing Elements:**
Array indexing starts at **0**. The last index is **size - 1**.
\`\`\`c
int val = scores[0]; // 90
\`\`\`

**Array Bounds (Safety Warning):**
C does NOT check if you access an index outside the array's size. Writing to \`scores[10]\` might crash your program or overwrite other data!

**2D Arrays (Matrices):**
\`\`\`c
int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };
printf("%d", matrix[1][2]); // Row 1, Col 2 -> 6
\`\`\`

---
**Memory Insight:** The name of an array is actually a pointer to its first element. So \`*numbers\` is the same as \`numbers[0]\`.`,
    slug: "c-arrays",
    order: 13
  },
  {
    language: "C",
    topic: "C Strings",
    content: `**String Manipulation in C**
In C, strings are not a separate data type but rather a null-terminated array of characters (\`char\`).

**Declaration:**
\`\`\`c
char str1[] = "Hello"; // Compiler adds '\\0' automatically
char str2[6] = {'H', 'e', 'l', 'l', 'o', '\\0'}; // Manual
\`\`\`

**The Null Character (\\0):**
This invisible character tells functions like \`printf()\` where the string ends. Without it, the computer would keep reading memory until it finds a zero or crashes.

**Common <string.h> Functions:**
• **strlen:** Returns length excluding \`\\0\`.
• **strcpy(dest, src):** Copies characters from one buffer to another.
• **strcmp(s1, s2):** Returns 0 if identical, positive/negative if different.
• **strcat(s1, s2):** Appends s2 to the end of s1.

**Inputting Strings:**
\`\`\`c
char name[50];
scanf("%s", name); // Reads until first space
fgets(name, 50, stdin); // Safe way to read a full line including spaces
\`\`\`

---
**Memory Warning:** Always ensure your character array is large enough to hold the text PLUS the null terminator (\`\\0\`).`,
    slug: "c-strings",
    order: 14
  },
  {
    language: "C",
    topic: "C User Input",
    content: `**Interacting with Users**
C provides several ways to get data from the keyboard.

**1. scanf():**
The generic input function using format specifiers.
\`\`\`c
int age;
scanf("%d", &age); // & sends the 'address' of age to the function
\`\`\`

**2. getchar() and putchar():**
Reads or writes a single character.
\`\`\`c
char ch = getchar();
putchar(ch);
\`\`\`

**3. fgets():**
Best for strings. Prevents "buffer overflow" by limiting input size.
\`\`\`c
char buffer[100];
fgets(buffer, 100, stdin);
\`\`\`

**Multiple Inputs:**
\`\`\`c
int day, year;
char month[20];
scanf("%d %s %d", &day, month, &year);
\`\`\`

---
**Advanced Tip:** \`scanf()\` returns an integer representing the number of successfully scanned items. You can use this to check for input errors:
\`if (scanf("%d", &n) != 1) { printf("Invalid number!"); }\``,
    slug: "c-user-input",
    order: 15
  },
  {
    language: "C",
    topic: "C Memory Addresses",
    content: `**Memory Management Basics**
Every variable is a named location in the computer's RAM. These locations have unique numeric IDs called addresses.

**How to See an Address:**
Use the ampersand (\`&\`) operator. In C, we print addresses using the \`%p\` format specifier.
\`\`\`c
int x = 10;
printf("Value: %d\\n", x);
printf("Address: %p\\n", (void*)&x);
\`\`\`

**Address in Hexadecimal:**
Addresses are typically shown in Hexadecimal (e.g., \`0x7ffeefbff568\`).

**Contiguous Memory:**
Array elements are stored right next to each other.
\`\`\`c
int arr[3];
printf("%p\\n", &arr[0]);
printf("%p\\n", &arr[1]); // Address will be exactly 4 bytes higher (size of int)
\`\`\`

---
**Why care?** Understanding addresses is the "secret sauce" of C. It allows you to build powerful tools like dynamic memory allocation, efficient data structures, and it’s the foundation for **Pointers**.`,
    slug: "c-memory-addresses",
    order: 16
  },
  {
    language: "C",
    topic: "C Pointers",
    content: `**The Power of Pointers**
A pointer is a variable that stores the memory address of another variable.

**Declaration:**
\`int* ptr; // A pointer to an integer variable\`

**Basic Pointer Operations:**
1. **Reference (\`&\`):** Get the address of a variable.
2. **Dereference (\`*\`):** Access the value stored AT a specific address.

**Example Code:**
\`\`\`c
int val = 100;
int* ptr = &val; // ptr now 'points' to val

printf("Address: %p\\n", ptr);
printf("Value via ptr: %d\\n", *ptr); // Dereferencing to get 100

*ptr = 200; // Directly modifying val via its address
printf("New value of val: %d", val); // Now 200
\`\`\`

**Pointer Arithmetic:**
You can increment a pointer (\`ptr++\`). It will jump by the size of the data type it points to.

**NULL Pointers:**
Always initialize a pointer to \`NULL\` if you don't have an address yet. 
\`int* p = NULL;\` - This prevents it from pointing to random, dangerous memory.

---
**Warning:** Dereferencing a NULL or invalid pointer is the most common cause of "Segmentation Fault" (program crash).`,
    slug: "c-pointers",
    order: 17
  },
  {
    language: "C",
    topic: "C Functions",
    content: `**Building Modular Code with Functions**
Functions are reusable blocks of code that perform a specific task. They make code readable, maintainable, and prevent repetition (DRY principle).

**The Three Steps of Using a Function:**
1. **Prolotype (Declaration):** Tells the compiler about the function.
\`\`\`c
int sum(int, int); // Declared above main
\`\`\`
2. **Definition:** The actual code.
\`\`\`c
int sum(int a, int b) { 
    return a + b; 
}
\`\`\`
3. **Call:** Executing the code.
\`\`\`c
int result = sum(10, 20);
\`\`\`

**Return Types:**
• **void:** Returns nothing.
• **int, float, char, etc:** Returns one value of that type.

**Recursion:**
A function that calls itself. Very useful for mathematical problems like factorials or tree traversals.
\`\`\`c
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
\`\`\`

---
**Design Tip:** Keep your functions small and focused on one task only.`,
    slug: "c-functions",
    order: 18
  },
  {
    language: "C",
    topic: "C Function Parameters",
    content: `**Passing Data to Functions**
Parameters allow us to pass information into a function.

**1. Pass by Value (Default):**
A *copy* of the variable is passed. Changes made inside the function do NOT affect the original variable.
\`\`\`c
void doubleVal(int x) { 
    x = x * 2; 
}
// Calling doubleVal(n) won't change 'n' in main.
\`\`\`

**2. Pass by Reference (using Pointers):**
The *address* is passed. The function can modify the original variable.
\`\`\`c
void doubleVal(int* x) { 
    *x = (*x) * 2; 
}
// Calling doubleVal(&n) WILL change 'n' in main.
\`\`\`

**3. Passing Arrays:**
When you pass an array to a function, it automatically passes the address (reference).
\`void printArray(int arr[], int size) { ... }\`

---
**Why use Pointers?**
• To modify multiple variables.
• To avoid copying large amounts of data (like big structures), saving memory and time.
• To return more than one value from a function.`,
    slug: "c-function-parameters",
    order: 19
  },
  {
    language: "C",
    topic: "C Variable Scope",
    content: `**Scope and Lifetime in C**
Scope determines where an identifier (variable/function) is visible and can be used.

**1. Local Scope:**
Variables declared inside a pair of curly braces \`{}\`.
• They are created when the block starts and destroyed when it ends.
• They cannot be accessed from outside the braces.

**2. Global Scope:**
Variables declared outside all functions.
• Visible to all functions in the file.
• Exist for the entire duration of the program.

**3. Static Scope:**
Use the \`static\` keyword.
• **Static Local:** Accessible only inside the function, but it RETAINS its value between calls.
• **Example:**
\`\`\`c
void count() {
    static int c = 0;
    printf("%d ", ++c);
}
// Calling count() three times prints: 1 2 3
\`\`\`

**The Scope Resolution Rule:**
If a local variable has the same name as a global variable, the local version takes priority (shadowing) inside its block.

---
**Best Practice:** Minimize the use of Global variables as they make debugging difficult and create hidden dependencies between functions.`,
    slug: "c-variable-scope",
    order: 20
  }
];

const seedC = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for Expanded 20 C topics seeding (GFG Style)...");

    // Remove old C topics to ensure exactly 20
    await Topic.deleteMany({ language: "C" });
    console.log("Cleared existing C topics.");

    await Topic.insertMany(cTopics);
    console.log("Successfully seeded 20 highly detailed C topics!");

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedC();
