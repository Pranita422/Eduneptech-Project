const NepSyllabus = require("../models/NepSyllabus");

exports.getNepSyllabus = async (req, res) => {
  try {
    const data = await NepSyllabus.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching NEP syllabus" });
  }
};
