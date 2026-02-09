const Problem = require("../models/Problem");
const ProblemProgress = require("../models/ProblemProgress");
const jwt = require("jsonwebtoken");

// Get problems based on language and optional difficulty
exports.getProblems = async (req, res) => {
    try {
        const { language, difficulty } = req.query;
        let query = {};

        if (language) {
            query.language = language;
        }

        if (difficulty) {
            query.difficulty = difficulty;
        }

        const problems = await Problem.find(query).sort({ order: 1 });

        // If user is logged in (via protect middleware), attach completion status
        let userProgress = [];
        const userId = req.user?.id;

        if (userId) {
            try {
                console.log(`[Backend] Fetching progress for user: ${userId}`);
                userProgress = await ProblemProgress.find({ userId });
                console.log(`[Backend] Found ${userProgress.length} progress records`);
            } catch (err) {
                console.error("[Backend] Error fetching progress:", err.message);
            }
        }

        const completedProblemIds = new Set(userProgress.map(p => p.problemId.toString()));
        console.log(`[Backend Debug] Completed Problem IDs:`, [...completedProblemIds]);

        const problemsWithStatus = problems.map(problem => {
            const isCompleted = completedProblemIds.has(problem._id.toString());
            // console.log(`Problem ${problem.title} (${problem._id}) completed? ${isCompleted}`);
            return {
                ...problem.toObject(),
                completed: isCompleted
            };
        });

        res.status(200).json(problemsWithStatus);
    } catch (err) {
        res.status(500).json({ message: "Error fetching problems", error: err.message });
    }
};

// Get a single problem by ID
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json(problem);
    } catch (err) {
        res.status(500).json({ message: "Error fetching problem", error: err.message });
    }
};
