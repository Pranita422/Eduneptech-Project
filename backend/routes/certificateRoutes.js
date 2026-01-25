const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllCertificates, claimCertificate, downloadCertificate } = require("../controllers/certificateController");

router.get("/", authMiddleware, getAllCertificates);
router.post("/claim", authMiddleware, claimCertificate);
router.get("/download/:type", authMiddleware, downloadCertificate);

module.exports = router;
