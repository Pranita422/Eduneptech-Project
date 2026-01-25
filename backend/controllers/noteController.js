const Note = require("../models/Note");
const fs = require('fs');
const path = require('path');

exports.uploadNote = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { title, description } = req.body;

        const newNote = new Note({
            title,
            description,
            filePath: `/uploads/${req.file.filename}`,
            fileType: req.file.mimetype,
            originalName: req.file.originalname,
            size: req.file.size
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Server error during upload" });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Remove file from filesystem
        // We need to resolve the path relative to the backend root
        const absolutePath = path.join(__dirname, '..', note.filePath);

        fs.unlink(absolutePath, async (err) => {
            if (err) console.error("Failed to delete file:", err);

            // Delete from DB regardless of file deletion success (to keep DB clean)
            await Note.findByIdAndDelete(req.params.id);
            res.json({ message: "Note deleted" });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
