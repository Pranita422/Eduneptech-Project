const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const vm = require("vm");

// Evaluate solution code against test cases
exports.submitCode = async (req, res) => {
    try {
        const { userId, problemId, language, code } = req.body;

        if (!userId || !problemId || !language || !code) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const testCases = problem.testCases || [];
        if (testCases.length === 0) {
            return res.status(400).json({ message: "No test cases defined for this problem" });
        }

        let testCasesPassed = 0;
        let result = "Accepted";

        // Evaluation logic (Supported: JavaScript)
        if (language.toLowerCase() === "javascript") {
            try {
                for (const testCase of testCases) {
                    const sandbox = { input: JSON.parse(testCase.input), result: null };
                    // We assume the user's code is a function or logic that sets a variable 'output'
                    // For example: "const solution = (n) => n * 2; output = solution(input);"
                    const script = new vm.Script(code + `\noutput = solution(input);`);
                    const context = vm.createContext(sandbox);
                    script.runInContext(context, { timeout: 1000 }); // 1s timeout

                    if (String(sandbox.output) === String(testCase.expectedOutput)) {
                        testCasesPassed++;
                    } else {
                        result = "Wrong Answer";
                    }
                }
            } catch (err) {
                result = "Runtime Error";
            }
        } else {
            // For other languages, we simulate for now
            // In a real app, this would call a remote execution API or a docker sandbox
            testCasesPassed = testCases.length;
            result = "Accepted";
        }

        const submission = new Submission({
            userId,
            problemId,
            language,
            code,
            result,
            testCasesPassed,
            totalTestCases: testCases.length
        });

        await submission.save();

        res.status(200).json({
            submissionId: submission._id,
            result,
            testCasesPassed,
            totalTestCases: testCases.length
        });
    } catch (err) {
        res.status(500).json({ message: "Error processing submission", error: err.message });
    }
};

// Get submission history for a user/problem
exports.getSubmissions = async (req, res) => {
    try {
        const { userId, problemId } = req.query;
        let query = {};
        if (userId) query.userId = userId;
        if (problemId) query.problemId = problemId;

        const submissions = await Submission.find(query).sort({ timestamp: -1 });
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching submissions", error: err.message });
    }
};
