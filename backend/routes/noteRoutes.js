const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadNote, getNotes, deleteNote } = require("../controllers/noteController");

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Unique filename: fieldname-timestamp.ext
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.post("/upload", upload.single("file"), uploadNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);

module.exports = router;
