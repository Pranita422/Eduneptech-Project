//mcqController.js
const Mcq = require("../models/Mcq");

exports.getMcqs = async (req, res) => {
    try {
        const { course, year } = req.query;
        console.log(`[API] GET /mcqs request received. Query:`, req.query);

        if (!course || !year) {
            console.log('[API] Missing parameters');
            return res.status(400).json({ message: "Course and Year are required parameters" });
        }

        const courseMap = {
            "bsc-it": "B.Sc IT",
            "bsc-cs": "B.Sc CS",
            "bsc-ds": "B.Sc DS"
        };

        const dbCourse = courseMap[course] || course;
        const dbYear = year.toUpperCase(); // Ensure uppercase for FY, SY, TY

        console.log(`[API] Resolved DB Search -> Course: "${dbCourse}", Year: "${dbYear}"`);

        const query = {
            framework: "NEP",
            course: dbCourse,
            year: dbYear
        };

        console.log('[API] MongoDB Query Object:', JSON.stringify(query));

        const mcqs = await Mcq.find(query);

        console.log(`[API] Found ${mcqs.length} MCQs`);

        if (mcqs.length === 0) {
            console.log('[API] No MCQs found. Checking if any MCQs exist for this course regardless of year/framework...');
            const anyForCourse = await Mcq.countDocuments({ course: dbCourse });
            console.log(`[API] Total MCQs for course "${dbCourse}" (any year/framework): ${anyForCourse}`);
        }

        res.json(mcqs);
    } catch (err) {
        console.error("[API] Error fetching MCQs:", err);
        res.status(500).json({ message: "Error fetching MCQs from database" });
    }
};

exports.seedMcqs = async (req, res) => {
    try {
        await Mcq.deleteMany({});

        const sampleData = [
            // B.Sc IT SY (Already provided)
            {
                framework: "NEP", course: "B.Sc IT", year: "SY", subject: "DBMS",
                question: "SQL stands for?",
                options: { A: "Structured Query Language", B: "Simple Query Language", C: "System Query Language", D: "Standard Query Logic" },
                correctAnswer: "A", difficulty: "Medium"
            },
            {
                framework: "NEP", course: "B.Sc IT", year: "SY", subject: "Networking",
                question: "Which protocol is used for email?",
                options: { A: "FTP", B: "SMTP", C: "HTTP", D: "IP" },
                correctAnswer: "B", difficulty: "Medium"
            },
            // B.Sc IT FY
            {
                framework: "NEP", course: "B.Sc IT", year: "FY", subject: "Imperative Programming",
                question: "Which of the following is an exit-controlled loop?",
                options: { A: "for", B: "while", C: "do-while", D: "if-else" },
                correctAnswer: "C", difficulty: "Easy"
            },
            // B.Sc CS FY
            {
                framework: "NEP", course: "B.Sc CS", year: "FY", subject: "Digital Logic",
                question: "Which gate is known as a Universal gate?",
                options: { A: "AND", B: "OR", C: "NAND", D: "XOR" },
                correctAnswer: "C", difficulty: "Easy"
            },
            // B.Sc DS FY
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Statistics",
                question: "The value that occurs most frequently in a dataset is called?",
                options: { A: "Mean", B: "Median", C: "Mode", D: "Range" },
                correctAnswer: "C", difficulty: "Medium"
            },
            // Additional DS FY MCQs
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Probability",
                question: "What is the probability of getting heads in a fair coin toss?",
                options: { A: "0.5", B: "0.25", C: "1", D: "0" },
                correctAnswer: "A", difficulty: "Easy"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Linear Algebra",
                question: "What is the determinant of a 2x2 identity matrix?",
                options: { A: "0", B: "1", C: "2", D: "-1" },
                correctAnswer: "B", difficulty: "Easy"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Data Mining",
                question: "Which algorithm is used for clustering?",
                options: { A: "K-Means", B: "Linear Regression", C: "Decision Tree", D: "Naive Bayes" },
                correctAnswer: "A", difficulty: "Medium"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Machine Learning",
                question: "What does SVM stand for?",
                options: { A: "Support Vector Machine", B: "Simple Variable Model", C: "Statistical Value Method", D: "Supervised Vector Mapping" },
                correctAnswer: "A", difficulty: "Medium"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Statistics",
                question: "What is the standard deviation a measure of?",
                options: { A: "Central tendency", B: "Spread of data", C: "Median", D: "Mode" },
                correctAnswer: "B", difficulty: "Medium"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Probability",
                question: "What is the complement rule?",
                options: { A: "P(A) + P(B) = 1", B: "P(A) = 1 - P(A')", C: "P(A and B) = P(A) * P(B)", D: "P(A or B) = P(A) + P(B)" },
                correctAnswer: "B", difficulty: "Medium"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "Data Visualization",
                question: "Which library is commonly used for plotting in Python?",
                options: { A: "NumPy", B: "Pandas", C: "Matplotlib", D: "SciPy" },
                correctAnswer: "C", difficulty: "Easy"
            },
            {
                framework: "NEP", course: "B.Sc Data Science", year: "FY", subject: "SQL",
                question: "Which clause is used to filter rows in SQL?",
                options: { A: "GROUP BY", B: "WHERE", C: "ORDER BY", D: "HAVING" },
                correctAnswer: "B", difficulty: "Easy"
            }
        ];
        await Mcq.insertMany(sampleData);
        res.json({ message: "Full-spectrum MCQs seeded successfully", count: sampleData.length });
    } catch (err) {
        console.error("Seed error:", err);
        res.status(500).json({ message: "Error seeding data" });
    }
};
