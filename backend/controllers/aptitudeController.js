const AptitudeQuestion = require("../models/AptitudeQuestion");

exports.getQuestions = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        // Limit to 10 random questions for now, or just all
        const questions = await AptitudeQuestion.find(query).limit(20);
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
