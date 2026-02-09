const AptitudeQuestion = require("../models/AptitudeQuestion");
const AptitudeProgress = require("../models/AptitudeProgress");

exports.getQuestions = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        // Limit to 10 random questions for now, or just all
        const questions = await AptitudeQuestion.find(query);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await AptitudeQuestion.distinct("category");
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.submitResult = async (req, res) => {
    try {
        const userId = req.user.id;
        const { category, answers } = req.body; // answers: { questionId: selectedOption }

        if (!category || !answers) {
            return res.status(400).json({ message: "Category and answers are required" });
        }

        const questionIds = Object.keys(answers);
        const questions = await AptitudeQuestion.find({ _id: { $in: questionIds } });

        let sessionScore = 0;
        const progressUpdates = questions.map(q => {
            const isCorrect = answers[q._id] === q.correctAnswer;
            if (isCorrect) sessionScore++;

            return {
                updateOne: {
                    filter: { userId, questionId: q._id },
                    update: {
                        userId,
                        questionId: q._id,
                        category: q.category,
                        isCorrect,
                        lastSolvedAt: new Date()
                    },
                    upsert: true
                }
            };
        });

        if (progressUpdates.length > 0) {
            await AptitudeProgress.bulkWrite(progressUpdates);
        }

        res.json({
            message: "Result submitted successfully",
            score: sessionScore,
            total: questions.length
        });
    } catch (err) {
        console.error("Error submitting result:", err);
        res.status(500).json({ message: err.message });
    }
};
