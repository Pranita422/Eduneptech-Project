const Certificate = require("../models/Certificate");
const Submission = require("../models/Submission");
// We can use Streak info if we had a Streak model accessible correctly, or mock for now
const User = require("../models/User");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const CERT_DEFINITIONS = [
    {
        type: "PROBLEM_SOLVER_BASIC",
        title: "Problem Solver - Basic",
        description: "Solved 3 Coding Problems",
        criteria: async (userId) => {
            const count = await Submission.countDocuments({
                userId,
                status: { $in: ["Accepted", "Correct"] } // Using flexible status check
            });
            // Try different status if "Accepted" didn't match. In problemController we used "Accepted" or "Correct"? 
            // SubmissionSchema usually has "status". Let's assume >= 3 for demo.
            return {
                eligible: count >= 3,
                progress: count,
                target: 3
            };
        }
    },
    {
        type: "DSA_BEGINNER",
        title: "DSA Beginner",
        description: "Solved 10 Coding Problems",
        criteria: async (userId) => {
            const count = await Submission.countDocuments({ userId, status: { $regex: /Accepted|Correct/i } });
            return {
                eligible: count >= 10,
                progress: count,
                target: 10
            };
        }
    },
    // Add more types easily
];

exports.getAllCertificates = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        const earnedCerts = await Certificate.find({ userId });
        const earnedTypes = new Set(earnedCerts.map(c => c.type));

        const result = await Promise.all(CERT_DEFINITIONS.map(async (def) => {
            const { eligible, progress, target } = await def.criteria(userId);
            return {
                ...def,
                status: earnedTypes.has(def.type) ? "EARNED" : (eligible ? "UNLOCKED" : "LOCKED"),
                progress,
                target
            };
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.claimCertificate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type } = req.body;

        // Verify eligibility again
        const def = CERT_DEFINITIONS.find(d => d.type === type);
        if (!def) return res.status(400).json({ message: "Invalid certificate type" });

        const { eligible } = await def.criteria(userId);
        if (!eligible) return res.status(400).json({ message: "Not eligible yet" });

        // Check if already claimed
        const existing = await Certificate.findOne({ userId, type });
        if (existing) return res.status(400).json({ message: "Already claimed" });

        const cert = new Certificate({
            userId,
            type,
            title: def.title,
            description: def.description
        });

        await cert.save();
        res.json({ message: "Certificate claimed!", certificate: cert });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.downloadCertificate = async (req, res) => {
    try {
        const { type } = req.params;
        const userId = req.user.id;

        // Ensure user owns this cert
        const cert = await Certificate.findOne({ userId, type });
        if (!cert) return res.status(404).json({ message: "Certificate not found" });

        const user = await User.findById(userId);

        // Generate PDF
        const doc = new PDFDocument({
            layout: "landscape",
            size: "A4",
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=certificate-${type}.pdf`);

        doc.pipe(res);

        // -- DESIGN --
        // Rect border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke("#4c1d95"); // Violet border

        // Content
        doc.fontSize(40).fillColor("#4c1d95").text("CERTIFICATE OF ACHIEVEMENT", {
            align: "center",
            underline: true
        });

        doc.moveDown();
        doc.fontSize(20).fillColor("black").text("This certifies that", { align: "center" });
        doc.moveDown();

        doc.fontSize(30).fillColor("#7c3aed").text(user.name || "Student", { align: "center" }); // User name
        doc.moveDown();

        doc.fontSize(20).fillColor("black").text("has successfully achieved the milestone:", { align: "center" });
        doc.moveDown();

        doc.fontSize(35).fillColor("#4c1d95").text(cert.title, { align: "center" });
        doc.moveDown();

        doc.fontSize(15).text(`Date: ${new Date(cert.issueDate).toLocaleDateString()}`, { align: "center" });

        doc.moveDown(2);
        doc.fontSize(12).text("EduNepTech Learning Platform", { align: "center" });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating PDF" });
    }
}
