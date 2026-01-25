const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Roadmap = require("./models/Roadmap");

dotenv.config({ path: path.join(__dirname, ".env") });

const roadmaps = [
    {
        slug: "frontend",
        title: "Frontend Developer",
        category: "Development",
        description: "Step-by-step guide to becoming a modern Frontend Developer in 2026.",
        steps: [
            {
                title: "Internet Basics",
                description: "How does the internet work? HTTP, DNS, Browsers.",
                resources: [{ label: "MDN Web Docs", url: "https://developer.mozilla.org" }]
            },
            {
                title: "HTML",
                description: "Learn the structure of web pages.",
                resources: [{ label: "W3Schools HTML", url: "https://www.w3schools.com/html/" }]
            },
            {
                title: "CSS",
                description: "Learn to style web pages. Flexbox, Grid, Responsive Design.",
                resources: [{ label: "CSS Tricks", url: "https://css-tricks.com/" }]
            },
            {
                title: "JavaScript",
                description: "Add interactivity. ES6+, DOM manipulation, Fetch API.",
                resources: [{ label: "JavaScript.info", url: "https://javascript.info/" }]
            },
            {
                title: "Frameworks (React)",
                description: "Learn a modern frontend framework like React.",
                resources: [{ label: "React Docs", url: "https://react.dev/" }]
            }
        ]
    },
    {
        slug: "backend",
        title: "Backend Developer",
        category: "Development",
        description: "Master server-side logic, databases, and APIs.",
        steps: [
            {
                title: "OS & Terminal",
                description: "Basic terminal usage, Process management.",
                resources: []
            },
            {
                title: "Programming Language",
                description: "Learn a backend language: Node.js, Python, Java, or Go.",
                resources: []
            },
            {
                title: "Databases",
                description: "Relational (PostgreSQL) vs NoSQL (MongoDB).",
                resources: []
            },
            {
                title: "APIs",
                description: "REST, GraphQL, Authentication (JWT/OAuth).",
                resources: []
            }
        ]
    },
    {
        slug: "dsa",
        title: "Data Structures & Algorithms",
        category: "Computer Science",
        description: "Core concepts for cracking coding interviews.",
        steps: [
            {
                title: "Big O Notation",
                description: "Time and Space complexity analysis.",
                resources: []
            },
            {
                title: "Arrays & Strings",
                description: "Basic manipulation, Two Pointers, Sliding Window.",
                resources: []
            },
            {
                title: "Linked Lists",
                description: "Singly, Doubly, Circular lists.",
                resources: []
            },
            {
                title: "Trees & Graphs",
                description: "Traversal (BFS/DFS), BST, Logic.",
                resources: []
            }
        ]
    },
    {
        slug: "fullstack",
        title: "Full Stack Developer",
        category: "Development",
        description: "Become a versatile developer capable of building entire web applications.",
        steps: [
            {
                title: "Frontend Foundations",
                description: "HTML, CSS, JavaScript, and React.",
                resources: []
            },
            {
                title: "Backend Core",
                description: "Node.js, Express, APIs, and Database design.",
                resources: []
            },
            {
                title: "Deployment & DevOps",
                description: "Docker, CI/CD, Cloud providers (AWS/Vercel).",
                resources: []
            },
            {
                title: "System Design",
                description: "Scalability, Caching, Load Balancing.",
                resources: []
            }
        ]
    },
    {
        slug: "mobile",
        title: "Mobile App Development",
        category: "Development",
        description: "Build native and cross-platform mobile applications.",
        steps: [
            {
                title: "Language Basics",
                description: "Swift (iOS) or Kotlin (Android).",
                resources: []
            },
            {
                title: "Cross-Platform Frameworks",
                description: "React Native or Flutter.",
                resources: [{ label: "React Native Docs", url: "https://reactnative.dev" }]
            },
            {
                title: "Native APIs",
                description: "Camera, GPS, Push Notifications.",
                resources: []
            },
            {
                title: "App Store Deployment",
                description: "Publishing to App Store and Google Play.",
                resources: []
            }
        ]
    },
    {
        slug: "datascience",
        title: "Data Science",
        category: "Data",
        description: "Analyze complex data to drive decision making.",
        steps: [
            {
                title: "Python & Statistics",
                description: "NumPy, Pandas, Probability basics.",
                resources: []
            },
            {
                title: "Data Visualization",
                description: "Matplotlib, Seaborn, Tableau.",
                resources: []
            },
            {
                title: "Machine Learning Basics",
                description: "Scikit-Learn, Regression, Classification.",
                resources: []
            },
            {
                title: "Deep Learning",
                description: "Neural Networks, TensorFlow/PyTorch.",
                resources: []
            }
        ]
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Seeding Roadmaps...");

        await Roadmap.deleteMany({});
        await Roadmap.insertMany(roadmaps);

        console.log(`Seeded ${roadmaps.length} roadmaps.`);
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
