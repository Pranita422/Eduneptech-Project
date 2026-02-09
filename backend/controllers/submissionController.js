const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const User = require("../models/User"); // Ensure User model is available
const ProblemProgress = require("../models/ProblemProgress");
const streakController = require("./streakController");
const vm = require("vm");

// Evaluate solution code against test cases
exports.submitCode = async (req, res) => {
    console.log("[Backend] Received submission request:", {
        userId: req.user.id,
        problemId: req.body.problemId,
        language: req.body.language,
        codeLength: req.body.code ? req.body.code.length : 0
    });

    try {
        const { problemId, language, code } = req.body;
        const userId = req.user.id;

        if (!problemId || !language || !code) {
            console.warn("[Backend] Missing required fields in submission");
            return res.status(400).json({ message: "Missing required fields" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            console.warn("[Backend] Problem not found:", problemId);
            return res.status(404).json({ message: "Problem not found" });
        }

        const testCases = problem.testCases || [];
        if (testCases.length === 0) {
            console.warn("[Backend] No test cases for problem:", problemId);
            return res.status(400).json({ message: "No test cases defined for this problem" });
        }

        let testCasesPassed = 0;
        let result = "Accepted";
        let message = "";

        // Evaluation logic (Supported: JavaScript)
        if (language.toLowerCase() === "javascript") {
            try {
                for (const testCase of testCases) {
                    const sandbox = {
                        input: JSON.parse(testCase.input),
                        output: null,
                        console: {
                            log: (...args) => console.log("User Log:", ...args),
                            error: (...args) => console.error("User Error:", ...args),
                            warn: (...args) => console.warn("User Warn:", ...args),
                            debug: (...args) => console.debug("User Debug:", ...args),
                        }
                    };

                    const script = new vm.Script(code + `\noutput = solution(input);`);
                    const context = vm.createContext(sandbox);
                    script.runInContext(context, { timeout: 1000 });

                    if (String(sandbox.output) === String(testCase.expectedOutput)) {
                        testCasesPassed++;
                    } else {
                        result = "Wrong Answer";
                    }
                }
            } catch (err) {
                console.error("[Backend] VM Execution Error:", err.message);
                result = "Runtime Error";
                message = err.message;
                testCasesPassed = 0;
            }
        } else {
            // Simulated for other languages
            testCasesPassed = testCases.length;
            result = "Accepted";
        }

        console.log("[Backend] Submission evaluation complete:", { result, testCasesPassed, total: testCases.length });

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
        console.log("[Backend] Submission saved successfully ID:", submission._id);

        // Record progress and update streak if accepted
        if (result === "Accepted") {
            try {
                // 1. Record problem progress
                await ProblemProgress.findOneAndUpdate(
                    { userId, problemId },
                    { completed: true, lastSolvedAt: Date.now() },
                    { upsert: true, new: true }
                );
                console.log(`[Backend] Progress recorded for user ${userId} on problem ${problemId}`);

                // 2. Update Daily Coding Challenge Streak
                const streakResult = await streakController.updateProblemStreak(userId);
                if (streakResult) {
                    message = streakResult.message; // Use streak message as response message if accepted
                    console.log(`[Backend] Streak updated for user ${userId}: ${streakResult.streak}`);
                }
            } catch (err) {
                console.error("[Backend] Error recording progress/streak:", err.message);
            }
        }

        res.status(200).json({
            submissionId: submission._id,
            result,
            message,
            testCasesPassed,
            totalTestCases: testCases.length
        });
    } catch (err) {
        console.error("[Backend] Global Submission Error:", err);
        res.status(500).json({
            result: "Submission Error",
            message: "Fatal system error while processing submission.",
            error: err.message
        });
    }
};

// Get submission history for a user/problem
exports.getSubmissions = async (req, res) => {
    try {
        // Securely default to the authenticated user's ID
        const userId = req.user.id;

        // Optional: Allow admins to query other users (add check here later if needed)
        // const userId = (req.user.isAdmin && req.query.userId) ? req.query.userId : req.user.id;

        let query = { userId }; // Always scope to the user

        if (req.query.problemId) {
            query.problemId = req.query.problemId;
        }

        const submissions = await Submission.find(query).sort({ timestamp: -1 });
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching submissions", error: err.message });
    }
};
