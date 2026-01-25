const express = require("express");
const router = express.Router();
const { getAllRoadmaps, getRoadmapBySlug } = require("../controllers/roadmapController");

router.get("/", getAllRoadmaps);
router.get("/:slug", getRoadmapBySlug);

module.exports = router;
