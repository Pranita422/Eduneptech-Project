const Problem = require("../models/Problem");
const Topic = require("../models/Topic");
const User = require("../models/User");
const Submission = require("../models/Submission");
const ProblemProgress = require("../models/ProblemProgress");
const AptitudeQuestion = require("../models/AptitudeQuestion");
const AptitudeProgress = require("../models/AptitudeProgress");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const languages = ["HTML", "CSS", "JavaScript"];
        const progress = {};

        await Promise.all(languages.map(async (lang) => {
            const lowerLang = lang.toLowerCase();

            // Count total topics and problems
            const [totalTopics, totalProblems] = await Promise.all([
                Topic.countDocuments({ language: lang }),
                Problem.countDocuments({ language: lang })
            ]);

            const totalItems = totalTopics + totalProblems;

            if (totalItems === 0) {
                progress[lowerLang] = 0;
                return;
            }

            // Count completed topics and problems for this user
            const [completedTopicsCount, completedProblemsCount] = await Promise.all([
                Topic.countDocuments({ language: lang, completedBy: userId }),
                ProblemProgress.countDocuments({ userId, completed: true, problemId: { $in: await Problem.find({ language: lang }).distinct("_id") } })
            ]);

            const completedItems = completedTopicsCount + completedProblemsCount;
            progress[lowerLang] = Math.min(100, Math.round((completedItems / totalItems) * 100));
        }));

        // Fetch Aptitude Progress
        const aptitudeCategories = ["Quantitative", "Logical Reasoning", "Verbal Ability", "Data Structures"];
        const aptitudeProgress = {};

        await Promise.all(aptitudeCategories.map(async (cat) => {
            const [totalQuestions, solvedCount] = await Promise.all([
                AptitudeQuestion.countDocuments({ category: cat }),
                AptitudeProgress.countDocuments({ userId, category: cat, isCorrect: true })
            ]);

            aptitudeProgress[cat] = totalQuestions > 0
                ? Math.round((solvedCount / totalQuestions) * 100)
                : 0;
        }));

        progress.aptitude = aptitudeProgress;

        progress.totalSolved = user.progress.totalSolved || 0;

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

exports.getEliteAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Fetch all completed problem progress
        const completedProgress = await ProblemProgress.find({ userId, completed: true });
        const completedProblemIds = completedProgress.map(p => p.problemId);

        // 2. Fetch details of completed problems to get difficulty
        const solvedProblems = await Problem.find({ _id: { $in: completedProblemIds } });

        // 3. Calculate Breakdown
        const breakdown = {
            Easy: 0,
            Medium: 0,
            Hard: 0
        };

        solvedProblems.forEach(p => {
            if (breakdown[p.difficulty] !== undefined) {
                breakdown[p.difficulty]++;
            }
        });

        // 4. Calculate Efficiency (Accepted vs Total Submissions)
        const totalSubmissionsCount = await Submission.countDocuments({ userId });
        const acceptedSubmissionsCount = await Submission.countDocuments({ userId, result: "Accepted" });

        const efficiency = totalSubmissionsCount > 0
            ? Math.round((acceptedSubmissionsCount / totalSubmissionsCount) * 100)
            : 0;

        // 5. Readiness Score (Weighted score: Easy=1, Medium=3, Hard=5)
        const readinessScore = (breakdown.Easy * 1) + (breakdown.Medium * 3) + (breakdown.Hard * 5);
        let readinessLevel = "Novice";
        if (readinessScore > 50) readinessLevel = "Intermediate";
        if (readinessScore > 150) readinessLevel = "Job Ready";
        if (readinessScore > 300) readinessLevel = "Elite";

        res.json({
            breakdown,
            efficiency,
            totalSolved: solvedProblems.length,
            readiness: {
                score: readinessScore,
                level: readinessLevel
            }
        });

    } catch (error) {
        console.error("Error fetching elite analytics:", error);
        res.status(500).json({ message: "Server error fetching analytics" });
    }
};
