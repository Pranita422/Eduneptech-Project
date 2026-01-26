const Problem = require("../models/Problem");
const Topic = require("../models/Topic");
const User = require("../models/User");
const Submission = require("../models/Submission");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming auth middleware adds user to req
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch total problem counts for each language
        const [htmlTotal, cssTotal, jsTotal] = await Promise.all([
            Problem.countDocuments({ language: "HTML" }),
            Problem.countDocuments({ language: "CSS" }),
            Problem.countDocuments({ language: "JavaScript" })
        ]);

        const calculatePercentage = (solved, total) => {
            if (!total || total === 0) return 0;
            return Math.min(100, Math.round((solved / total) * 100));
        };

        const progress = {
            html: calculatePercentage(user.progress.html || 0, htmlTotal),
            css: calculatePercentage(user.progress.css || 0, cssTotal),
            javascript: calculatePercentage(user.progress.javascript || 0, jsTotal),
            totalSolved: user.progress.totalSolved || 0
        };

        // Get recent activity (submissions)
        const recentSubmissions = await Submission.find({ userId })
            .sort({ timestamp: -1 })
            .limit(5)
            .populate("problemId", "title difficulty");

        res.json({
            user: {
                name: user.name,
                email: user.email,
                streak: user.streak,
                lastActiveDate: user.lastActiveDate,
                progress: progress,
                achievements: user.achievements || []
            },
            recentActivity: recentSubmissions
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
