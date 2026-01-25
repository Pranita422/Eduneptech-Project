const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Topic = require("./models/Topic");

dotenv.config({ path: path.join(__dirname, ".env") });

const javaTopics = [
  {
    language: "Java",
    topic: "Introduction to Java",
    content: `**What is Java?**
Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers **Write Once, Run Anywhere (WORA)**, meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.

**History of Java:**
• **Created by:** James Gosling at Sun Microsystems.
• **Initial Release:** 1995.
• **Named after:** Java coffee from Indonesia.
• **Current Status:** Owned by Oracle Corporation.

**Key Features of Java:**
• **Simple:** Removes features like explicit pointers and operator overloading to reduce complexity.
• **Platform Independent:** Java programs are compiled into bytecode which is interpreted by the JVM.
• **Secure:** Includes a security manager and a sandbox environment for applets.
• **Robust:** Strong memory management and exception handling.
• **Multithreaded:** Built-in support for concurrent execution of multiple tasks.
• **High Performance:** Just-In-Time (JIT) compilers convert bytecode to native machine code on demand.

**Example Code:**
\`\`\`java
public class HelloWorld {
    // Execution starts from this main method
    public static void main(String[] args) {
        System.out.println("Hello World! Java is awesome.");
    }
}
\`\`\`

---
**Why study Java?**
Java is one of the most widely used programming languages in the world, powering billions of devices, including server-side applications, Android apps, and even enterprise software.`,
    slug: "introduction-to-java",
    order: 1
  },
  {
    language: "Java",
    topic: "JVM, JRE, and JDK",
    content: `**Deep Dive into Java Architecture**
To master Java, you must understand the architecture that makes it platform-independent.

**1. JVM (Java Virtual Machine):**
The JVM is the engine that drives the Java code. It is the component that actually executes the Java bytecode.
• **Core Tasks:** Load code, Verify code, Execute code, Provide runtime environment.
• **Platform-dependent:** Every OS has its own specific JVM implementation.

**2. JRE (Java Runtime Environment):**
The JRE is a software package that contains what is required to run a Java program.
• **Includes:** JVM + Class libraries (rt.jar) + Support files.
• **Note:** You cannot develop apps with JRE alone; it's for execution only.

**3. JDK (Java Development Kit):**
The full toolkit for developers.
• **Includes:** JRE + Development tools like \`javac\` (compiler), \`jdb\` (debugger), and \`javadoc\`.

**How it all fits together:**
\`\`\`text
JDK = JRE + Development Tools
JRE = JVM + Library Files
\`\`\`

---
**Architecture Diagram View:**
• **Source Code (.java)** → **Javac Compiler** → **Bytecode (.class)** → **JVM (Class Loader -> Bytecode Verifier -> JIT Compiler)** → **Machine Code**.`,
    slug: "java-jvm-jre-jdk",
    order: 2
  },
  {
    language: "Java",
    topic: "Java Syntax and Main Method",
    content: `**Anatomy of a Java Program**
Every Java application must have at least one class and a \`main\` method.

**Example Structured Code:**
\`\`\`java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java!"); 
  }
}
\`\`\`

**Breakdown of Keywords:**
• **public:** This access modifier means that the class or method is visible to all other classes.
• **static:** Static methods belong to the class rather than an instance. This allows the JVM to call \`main()\` without creating an object of the class.
• **void:** Specifies that the method does not return any data.
• **main:** The standard name for the entry point.
• **String[] args:** An array of strings used to pass command-line arguments.

**Syntax Rules:**
1. **Case Sensitivity:** Java is case-sensitive (\`System\` is not \`system\`).
2. **Class Names:** Should start with an Uppercase letter (\`MyClass\`).
3. **Method Names:** Should start with a Lowercase letter (\`myMethod\`).
4. **File Name:** Must exactly match the public class name (e.g., \`Main.java\`).

---
**Best Practice:** Always use clear indented code blocks to improve readability. Java uses curly braces \`{}\` to define blocks.`,
    slug: "java-syntax",
    order: 3
  },
  {
    language: "Java",
    topic: "Java Variables and Data Types",
    content: `**Variables and Data Storage in Java**
Variables are containers for storing data values. In Java, there are different types of variables.

**1. Primary Data Types (Primitives):**
• **Integer types:** \`byte\` (1 byte), \`short\` (2 bytes), \`int\` (4 bytes), \`long\` (8 bytes).
• **Floating point types:** \`float\` (4 bytes), \`double\` (8 bytes - default).
• **Character type:** \`char\` (2 bytes - Unicode).
• **Boolean type:** \`boolean\` (true/false).

**2. Reference Types (Objects):**
These refer to objects and have a default value of \`null\`. Examples: \`String\`, \`Arrays\`, \`Classes\`.

**Variable Declarations:**
\`\`\`java
int age = 20;
double price = 10.99d;
float temp = 98.6f; // Must add 'f' for float
char grade = 'A';
boolean isAvailable = true;
String name = "John Doe";
\`\`\`

**Variable Scope:**
• **Local variables:** Declared inside methods.
• **Instance variables:** Declared in a class but outside methods.
• **Static variables:** Declared with the \`static\` keyword, shared across all instances.

---
**Memory Insight:** Primitives are stored in the **Stack**, while objects (reference types) are stored in the **Heap**, with a reference pointer in the stack.`,
    slug: "java-variables-data-types",
    order: 4
  },
  {
    language: "Java",
    topic: "Java Type Casting",
    content: `**Casting and Type Conversions**
Type casting is when you assign a value of one primitive data type to another type.

**1. Widening Casting (Implicit - Automatic):**
Widening happens when passing a smaller type to a larger type size. It is safe and done automatically.
\`byte -> short -> char -> int -> long -> float -> double\`

**Example:**
\`\`\`java
int myInt = 9;
double myDouble = myInt; // Automatic casting
System.out.println(myDouble); // 9.0
\`\`\`

**2. Narrowing Casting (Explicit - Manual):**
Narrowing happens when passing a larger type to a smaller type size. It must be done manually by placing the type in parentheses in front of the value.
\`double -> float -> long -> int -> char -> short -> byte\`

**Example:**
\`\`\`java
double myDouble = 9.78d;
int myInt = (int) myDouble; // Manual casting
System.out.println(myInt); // 9
\`\`\`

---
**Important:** Narrowing casting can cause data loss (e.g., the fractional part of a double being removed when cast to an int).`,
    slug: "java-type-casting",
    order: 5
  },
  {
    language: "Java",
    topic: "Java Operators",
    content: `**Comprehensive Java Operators**
Operators are used to perform operations on variables and values.

**1. Arithmetic Operators:**
\`+\` Addition, \`-\` Subtraction, \`*\` Multiplication, \`/\` Division, \`%\` Modulo (Remainder), \`++\` Increment, \`–-\` Decrement.

**2. Comparison Operators (Return Boolean):**
\`==\` Equal, \`!=\` Not Equal, \`>\` Greater, \`<\` Less, \`>=\`, \`<=\`.

**3. Logical Operators:**
\`&&\` (Logical AND), \`||\` (Logical OR), \`!\` (Logical NOT).

**4. Bitwise Operators:**
\`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\` (Left Shift), \`>>\` (Right Shift).

**5. Assignment Operators:**
\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`.

**Ternary Operator Example:**
\`\`\`java
int a = 10, b = 20;
int max = (a > b) ? a : b; // Result is 20
\`\`\`

---
**Caution:** In integer division (\`5 / 2\`), Java truncates the decimal and returns \`2\`. To get a double, use \`5.0 / 2\`.`,
    slug: "java-operators",
    order: 6
  },
  {
    language: "Java",
    topic: "Java Strings",
    content: `**Java String Manipulation**
A String in Java is an **object** that represents a sequence of characters. Strings are **immutable**, meaning they cannot be changed once created.

**Creating Strings:**
\`\`\`java
String s1 = "Hello"; // String Literal
String s2 = new String("Hello"); // Using 'new' keyword
\`\`\`

**Essential Methods:**
• **length():** Returns the number of characters.
• **charAt(index):** Returns the character at the specified index.
• **substring(start, end):** Extracts a part of the string.
• **contains(seq):** Checks if the string contains a sequence.
• **equals(other):** Compares content (always use this instead of \`==\`).

**Concatenation Examples:**
\`\`\`java
String hi = "Hello ";
String world = "World";
String full = hi + world; // Using + operator
String full2 = hi.concat(world); // Using concat()
\`\`\`

---
**Efficiency Tip:** If you frequently modify strings in a loop, use **StringBuilder** or **StringBuffer** to avoid creating multiple temporary objects in the heap.`,
    slug: "java-strings",
    order: 7
  },
  {
    language: "Java",
    topic: "Java Math",
    content: `**Computational Math in Java**
The \`java.lang.Math\` class contains methods for performing basic numeric operations such as the elementary exponential, logarithm, square root, and trigonometric functions.

**Common Math Methods:**
• **Math.max(x, y):** Find the highest value.
• **Math.min(x, y):** Find the lowest value.
• **Math.sqrt(x):** Returns the square root of x.
• **Math.abs(x):** Returns the absolute (positive) value of x.
• **Math.pow(x, y):** Returns x to the power of y.
• **Math.random():** Returns a number between 0.0 and 1.0.

**Code Example:**
\`\`\`java
int x = 16;
System.out.println(Math.sqrt(x)); // 4.0
System.out.println(Math.pow(2, 3)); // 8.0
System.out.println(Math.ceil(5.3)); // 6.0
System.out.println(Math.floor(5.8)); // 5.0
\`\`\`

---
**Note:** All methods of the \`Math\` class are **static**, meaning you don't need to create an instance of \`Math\` to use them.`,
    slug: "java-math",
    order: 8
  },
  {
    language: "Java",
    topic: "Java Conditionals (If-Else)",
    content: `**Decision Making in Java**
Conditionals are used to perform different actions based on different conditions.

**1. Simple If:**
\`\`\`java
if (score >= 90) {
  System.out.println("Grade A");
}
\`\`\`

**2. If-Else:**
\`\`\`java
if (age < 18) {
  System.out.println("Underage");
} else {
  System.out.println("Adult");
}
\`\`\`

**3. If-Else-If Ladder:**
Checks multiple conditions in sequence.

**4. Ternary Operator (Shorthand):**
\`variable = (condition) ? valueIfTrue : valueIfFalse;\`
\`\`\`java
String result = (time < 12) ? "Morning" : "Evening";
\`\`\`

---
**Reminder:** The condition inside an \`if\` statement **must** evaluate to a boolean (\`true\` or \`false\`). Unlike C++, \`if(1)\` will result in a compile-time error in Java.`,
    slug: "java-conditionals",
    order: 9
  },
  {
    language: "Java",
    topic: "Java Switch",
    content: `**Controlled Selection: Switch Case**
The \`switch\` statement is used to execute one of many code blocks based on the value of an expression.

**Switch Structure:**
\`\`\`java
switch (day) {
  case 1:
    System.out.println("Monday");
    break;
  case 2:
    System.out.println("Tuesday");
    break;
  default:
    System.out.println("Weekend");
}
\`\`\`

**Rules of Switch:**
• **break:** Jumps out of the switch block. If omitted, execution "falls through" to the next case.
• **default:** A catch-all if no cases match.
• **Types:** Supported types include \`byte\`, \`short\`, \`int\`, \`char\`, \`enums\`, and **Strings** (since Java 7).

---
**Modern Java Update:** Since Java 12, there are **Switch Expressions** which use arrows \`->\` and don't require \`break\` to avoid fall-through.`,
    slug: "java-switch",
    order: 10
  },
  {
    language: "Java",
    topic: "Java While and Do-While Loops",
    content: `**Iterative Control: While Loops**

**1. While Loop (Entry-controlled):**
Loops through a block of code while a specified condition is true. The condition is checked **before** the code block is executed.
\`\`\`java
int i = 0;
while (i < 5) {
    System.out.print(i + " ");
    i++;
}
// Output: 0 1 2 3 4
\`\`\`

**2. Do-While Loop (Exit-controlled):**
Executes the code block **at least once**, then repeats the loop as long as the condition is true.
\`\`\`java
int i = 0;
do {
    System.out.println("This will run at least once!");
} while (i < 0);
\`\`\`

---
**Note:** Always remember to update the loop counter (e.g., \`i++\`) inside the loop, otherwise you will create an **Infinite Loop**!`,
    slug: "java-while-loops",
    order: 11
  },
  {
    language: "Java",
    topic: "Java For Loop",
    content: `**Traditional and Enhanced For Loops**

**1. Standard For Loop:**
Use this when you know exactly how many times you want to iterate.
\`\`\`java
for (int i = 0; i < 5; i++) {
  System.out.println("Loop: " + i);
}
\`\`\`
• **Initialization:** Runs once.
• **Condition:** Checked before every iteration.
• **Increment/Decrement:** Updates the counter after the body.

**2. Enhanced For Loop (For-Each):**
Used exclusively to iterate through elements in an array or collection.
\`\`\`java
String[] cars = {"Volvo", "BMW", "Ford"};
for (String car : cars) {
  System.out.println(car);
}
\`\`\`

---
**Efficiency Hint:** For-each is cleaner and less error-prone when simply reading elements from a list.`,
    slug: "java-for-loop",
    order: 12
  },
  {
    language: "Java",
    topic: "Java Break and Continue",
    content: `**Loop Control: Break and Continue**

**Break Statement:**
Immediately exits the current loop or switch block.
\`\`\`java
for (int i = 0; i < 10; i++) {
  if (i == 4) break; 
  System.out.println(i);
}
// Outputs 0 1 2 3
\`\`\`

**Continue Statement:**
Skips the rest of the current iteration and jumps to the next one.
\`\`\`java
for (int i = 0; i < 10; i++) {
  if (i == 4) continue;
  System.out.println(i);
}
// Outputs everything except 4
\`\`\`

**Labeled Loops:**
You can label a loop to break or continue an outer loop from an inner loop.
\`\`\`java
outer: for (...) {
  for (...) {
    if (...) break outer;
  }
}
\`\`\``,
    slug: "java-break-continue",
    order: 13
  },
  {
    language: "Java",
    topic: "Java Arrays",
    content: `**Sequence of Elements: Java Arrays**
Arrays in Java are objects that store multiple values of the same type.

**Initialization:**
\`\`\`java
int[] myNum = {10, 20, 30, 40}; // Shorthand
String[] cars = new String[3]; // Fixed size allocation
cars[0] = "Volvo";
\`\`\`

**Array Management:**
• **Index:** Starts at 0.
• **Length:** Access the size via \`myNum.length\`.
• **Memory:** Arrays are objects, so they reside on the **Heap**.

**Multidimensional Arrays:**
A "matrix" can be created as an array of arrays.
\`\`\`java
int[][] myNumbers = { {1, 2, 3}, {4, 5, 6} };
System.out.println(myNumbers[1][2]); // 6
\`\`\`

---
**Caution:** Trying to access \`myNum[10]\` when the size is 4 will throw a \`ArrayIndexOutOfBoundsException\`.`,
    slug: "java-arrays",
    order: 14
  },
  {
    language: "Java",
    topic: "Java Methods",
    content: `**Reusable Logic: Java Methods**
A method is a block of code which only runs when it is called. Methods are used to perform certain actions, and they are also known as **functions**.

**Defining a Method:**
\`\`\`java
public class MyMain {
  static void myMethod(String name) {
    System.out.println("Hello " + name);
  }

  public static void main(String[] args) {
    myMethod("Liam");
  }
}
\`\`\`

**Method Overloading:**
Multiple methods can have the same name with different parameters.
\`\`\`java
int add(int x, int y);
double add(double x, double y);
\`\`\`

**Parameters vs Arguments:**
• **Parameters:** Variables listed in the method definition.
• **Arguments:** Actual values passed to the method when it is called.`,
    slug: "java-methods",
    order: 15
  },
  {
    language: "Java",
    topic: "Java OOP Concepts",
    content: `**The Heart of Java: OOP Pillars**
Java is completely built around Object-Oriented Programming principles.

**1. Encapsulation:**
Wrapping data (variables) and code (methods) together as a single unit. Data is kept private and accessed via public methods (Getters/Setters).

**2. Inheritance:**
Mechanism where one class acquires the properties of another. Use the \`extends\` keyword.

**3. Polymorphism:**
The ability of an object to take on many forms. Most common use is when a parent class reference is used to refer to a child class object.

**4. Abstraction:**
Dealing with ideas rather than events. Hiding details and showing only essentials to the user. Accomplished using **Abstract Classes** and **Interfaces**.

---
**Goal:** OOP helps in keeping the code modular, reusable, and much easier to debug.`,
    slug: "java-oop-concepts",
    order: 16
  },
  {
    language: "Java",
    topic: "Java Classes and Objects",
    content: `**Building Real-World Entities**
A class is a blueprint, and an object is a real-world entity created from that blueprint.

**Example Implementation:**
\`\`\`java
class Car {
  String brand;
  int modelYear;

  Car(String b, int y) { // Constructor
    brand = b;
    modelYear = y;
  }
}

public class Main {
  public static void main(String[] args) {
    Car myCar = new Car("Tesla", 2022); // Object instantiation
    System.out.println(myCar.brand);
  }
}
\`\`\`

**Attributes and Methods:**
• **Attributes:** Variables belonging to the class (\`brand\`).
• **Methods:** Functions belonging to the class.

**Constructors:**
Special methods used to initialize objects. They are called when an object is created using the \`new\` keyword.`,
    slug: "java-classes-objects",
    order: 17
  },
  {
    language: "Java",
    topic: "Java Modifiers",
    content: `**Controlled Access: Java Modifiers**
Modifiers are keywords that you add to those definitions to change their meanings.

**1. Access Modifiers:**
• **public:** Accessible from anywhere.
• **private:** Only within the same class.
• **protected:** Within same package or in subclasses.
• **(default):** Only within the same package.

**2. Non-Access Modifiers:**
• **final:** Constants (cannot be changed or inherited).
• **static:** Belongs to the class (shared among all objects).
• **abstract:** Used to create abstract classes and methods.
• **volatile/synchronized:** Used in multithreading.

**Example of 'final':**
\`\`\`java
final int MAX_RETRIES = 5;
// MAX_RETRIES = 10; // Error!
\`\`\``,
    slug: "java-modifiers",
    order: 18
  },
  {
    language: "Java",
    topic: "Java Packages and API",
    content: `**Code Organization: Packages**
A package in Java is used to group related classes. Think of it as a folder in a file system.

**Why use Packages?**
1. To avoid name conflicts.
2. To make code more organized and searchable.

**Importing Packages:**
\`\`\`java
import java.util.Scanner; // Import a single class
import java.io.*;         // Import everything from java.io
\`\`\`

**Creating Your Own Package:**
\`\`\`java
package my_project.utils; // Must be on line 1
public class Calculator { ... }
\`\`\`

---
**Standard Library:** The Java API (Application Programming Interface) is a huge collection of pre-written classes that you can use out-of-the-box.`,
    slug: "java-packages",
    order: 19
  },
  {
    language: "Java",
    topic: "Java Exceptions (Try-Catch)",
    content: `**Robust Error Handling**
Exceptions are events that occur during code execution and disrupt the normal flow of instructions.

**Structure of Exception Handling:**
\`\`\`java
try {
  // Potentially risky code
  int data = 100 / 0; 
} catch (ArithmeticException e) {
  // Specific handling
  System.out.println("Cannot divide by zero!");
} catch (Exception e) {
  // Generic fallback
  System.out.println(e);
} finally {
  // Always runs
  System.out.println("Cleaning up resources...");
}
\`\`\`

**Key Terms:**
• **throw:** Explicitly throw an exception from a method.
• **throws:** Declare that a method might throw certain exceptions.
• **finally:** Block used for critical cleanup (closing files/connections).

---
**Tip:** Only use \`try-catch\` for errors that can actually happen at runtime, not for logical errors in your code.`,
    slug: "java-exceptions",
    order: 20
  }
];

const seedJava = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for Expanded 20 Java topics seeding (GFG Style)...");

    // Remove old Java topics to ensure exactly 20
    await Topic.deleteMany({ language: "Java" });
    console.log("Cleared existing Java topics.");

    await Topic.insertMany(javaTopics);
    console.log("Successfully seeded 20 highly detailed Java topics!");

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedJava();
