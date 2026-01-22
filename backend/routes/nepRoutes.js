const express = require("express");
const router = express.Router();

const { getNepSyllabus } = require("../controllers/nepController");

router.get("/", getNepSyllabus);

module.exports = router;
