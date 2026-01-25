const Roadmap = require("../models/Roadmap");

exports.getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find({}, "title slug category description");
        res.json(roadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRoadmapBySlug = async (req, res) => {
    try {
        const roadmap = await Roadmap.findOne({ slug: req.params.slug });
        if (!roadmap) {
            return res.status(404).json({ message: "Roadmap not found" });
        }
        res.json(roadmap);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
