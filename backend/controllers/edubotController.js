const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

/**
 * EduBot Controller
 * Handles intelligent responses for navigation, progress, and motivation.
 */

// Intent classification patterns
const INTENTS = {
    GREETING: /\b(hi|hello|hey|sup|good morning|yo)\b/i,
    CLOSING: /\b(bye|goodbye|see you|take care|exit|close)\b/i,
    GRATITUDE: /\b(thank you|thanks|thank|appreciate|thx)\b/i,
    NAVIGATION: /\b(where|find|how to|access|go to|page|section|roadmap|aptitude|certificate|settings|programming)\b/i,
    PROGRESS: /\b(progress|score|solved|how am i doing|how many|rank|stats|achievement)\b/i,
    RECOMMENDATION: /\b(what to learn|what to study|next steps|suggest|recommend|next topic|guide)\b/i,
    MOTIVATION: /\b(stuck|hard|difficult|motivation|encourage|help me|don't understand|struggling)\b/i
};

// Enhanced Navigation routes map
const NAVIGATION_MAP = {
    roadmap: {
        title: "Roadmaps",
        description: "You can find our learning paths in the **Roadmaps** section via the sidebar. It's the best place to see your structured journey for different technologies.",
        route: "/dashboard/roadmaps"
    },
    aptitude: {
        title: "Aptitude Tests",
        description: "Practice your logic and quantitative skills in the **Aptitude** section. You can find it under the 'Preparation' menu in the sidebar.",
        route: "/dashboard/aptitude"
    },
    certificate: {
        title: "Certificates",
        description: "Your earned credentials are saved in the **Certificates** page. Look for the diploma icon in the top right or the sidebar menu.",
        route: "/dashboard/certificates"
    },
    profile: {
        title: "Profile Settings",
        description: "Manage your personal info and preferences in the **User Profile** section, accessible by clicking your avatar or through the sidebar.",
        route: "/dashboard/profile"
    },
    settings: {
        title: "Settings",
        description: "You can customize your theme and notifications in the **Settings** menu at the bottom of the sidebar.",
        route: "/dashboard/settings"
    },
    programming: {
        title: "Programming Languages",
        description: "Dive into specific languages like HTML, CSS, and JS in the **Programming Languages** dashboard from the main menu.",
        route: "/programming-languages"
    }
};

exports.processChat = async (req, res) => {
    console.log("🤖 [EduBot] Received message request:", req.body.text);
    try {
        const { text, context } = req.body;
        const userId = req.user.id;
        const sanitizedText = text?.trim().toLowerCase().replace(/[!?.,]/g, "") || "";

        // 1. Save User Message
        const userMsg = await ChatMessage.create({
            userId,
            sender: "user",
            text,
            context: context || {}
        });

        // 2. Identify Intent
        let botResponse = "";
        let intent = "unknown";

        // Priority check: Gratitude and Closings come first for a human-like flow
        if (INTENTS.CLOSING.test(sanitizedText)) {
            intent = "closing";
            botResponse = "Goodbye! Happy learning, and I'll be here whenever you need a hand. Take care! 👋";
        } else if (INTENTS.GRATITUDE.test(sanitizedText)) {
            intent = "gratitude";
            botResponse = "You're very welcome! I'm glad I could help. Just let me know if there's anything else you need.";
        } else if (INTENTS.GREETING.test(sanitizedText)) {
            intent = "greeting";
            const user = await User.findById(userId);
            botResponse = `Hello ${user?.name || 'there'}! 👋 I'm EduBot, your personal learning assistant. How can I help you move forward today?`;
        } else if (INTENTS.NAVIGATION.test(sanitizedText)) {
            intent = "navigation";
            botResponse = generateNavigationResponse(sanitizedText);
        } else if (INTENTS.PROGRESS.test(sanitizedText)) {
            intent = "progress";
            botResponse = await generateProgressResponse(userId);
        } else if (INTENTS.RECOMMENDATION.test(sanitizedText)) {
            intent = "recommendation";
            botResponse = await generateRecommendation(userId);
        } else if (INTENTS.MOTIVATION.test(sanitizedText)) {
            intent = "motivation";
            botResponse = await generateMotivation(userId);
        } else {
            // Mentor-like fallback: friendly, supportive, and guides toward asking for help
            botResponse = "I'm here to support your journey, though I didn't quite catch the specifics of your request. Are you looking for a **Learning Roadmap**, trying to check your **Progress**, or do you need a **Recommendation** for what to study next? Tell me a bit more so I can guide you better!";
        }

        console.log(`🤖 [EduBot] Detected intent: ${intent} for text: "${sanitizedText}"`);

        // 3. Save Bot Message
        const botMsg = await ChatMessage.create({
            userId,
            sender: "bot",
            text: botResponse,
            context: { ...(context || {}), intent }
        });

        res.json({
            reply: botResponse,
            history: [userMsg, botMsg]
        });

    } catch (error) {
        console.error("[EduBot] Chat error details:", {
            message: error.message,
            stack: error.stack,
            userId: req.user?.id
        });
        res.status(500).json({
            message: `EduBot is resting temporarily. Please try again in a moment!`,
            error: error.message
        });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const history = await ChatMessage.find({ userId: req.user.id })
            .sort({ timestamp: 1 })
            .limit(50);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Failed to load chat history." });
    }
};

exports.clearChatHistory = async (req, res) => {
    try {
        await ChatMessage.deleteMany({ userId: req.user.id });
        res.json({ message: "Chat history cleared." });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear chat history." });
    }
};

// --- Helper Functions ---

function generateNavigationResponse(text) {
    const keys = Object.keys(NAVIGATION_MAP);
    for (const key of keys) {
        if (text.toLowerCase().includes(key)) {
            const nav = NAVIGATION_MAP[key];
            return `${nav.description} You can jump straight there using this link: \`${nav.route}\`. Is there anything specific you're looking for there?`;
        }
    }
    return "I can guide you to any part of the platform! We have sections for **Roadmaps**, **Aptitude Tests**, **Programming Languages**, and your **Personal Profile**. Which one would you like to explore?";
}

async function generateProgressResponse(userId) {
    const user = await User.findById(userId);
    const acceptedSubmissions = await Submission.find({ userId, result: "Accepted" }).populate('problemId');

    if (acceptedSubmissions.length === 0) {
        return "It looks like you haven't started solving problems yet. Don't worry, every journey begins with a single step! I'd recommend starting with the **HTML Fundamentals** roadmap to build your first win.";
    }

    const uniqueLangs = [...new Set(acceptedSubmissions.map(s => s.language))];
    const streakMsg = user.streak > 0
        ? `You're on a **${user.streak}-day streak**!`
        : "Let's start your streak today by solving one problem!";

    return `You're making great strides! You've successfully conquered **${acceptedSubmissions.length} problems** across ${uniqueLangs.length} different areas (${uniqueLangs.join(', ')}). ${streakMsg} Your dedication is paying off—keep that momentum going!`;
}

async function generateRecommendation(userId) {
    const submissions = await Submission.find({ userId, result: "Accepted" });
    const solvedCount = submissions.length;

    if (solvedCount === 0) {
        return "Since you're just starting, I highly recommend checking out our **Learning Roadmaps**. They provide a clear path from beginner to expert. Starting with **Basics of Web Development** is usually a great first move!";
    }

    if (solvedCount < 5) {
        return "You've got the basics down! I suggest focusing on the **CSS Styling** roadmap next to make your projects look professional. Or, if you're feeling adventurous, try a **Level 1 Aptitude Test** to challenge your logic.";
    }

    return "You're becoming quite the pro! Based on your progress, I recommend diving into **JavaScript DOM Manipulation** or exploring our **Advanced Aptitude** section to prepare for technical interviews.";
}

async function generateMotivation(userId) {
    const user = await User.findById(userId);
    const encouragement = [
        "Remember, every bug you fix makes you a better developer. Coding is all about persistence!",
        "Struggling is a sign that you're learning something new. Take a deep breath, maybe a short walk, and try one more time.",
        "You've already solved several challenges—you definitely have what it takes to get through this one!",
        "The best developers aren't the ones who never get stuck, but the ones who never give up. You're doing great.",
        "Think about how far you've come since your first 'Hello World'. This is just another milestone on your path."
    ];
    const randomMsg = encouragement[Math.floor(Math.random() * encouragement.length)];

    return `${randomMsg} \n\nYour record streak is **${user.longestStreak || 0} days**. If you're really stuck, try checking the **Theory Content** section for some hints!`;
}
