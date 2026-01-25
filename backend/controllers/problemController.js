const Problem = require("../models/Problem");

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
        res.status(200).json(problems);
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
