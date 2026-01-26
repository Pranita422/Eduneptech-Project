//server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const topicRoutes = require("./routes/topicRoutes");

const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("[Server] Starting...");
console.log("MONGO_URL =", process.env.MONGO_URL);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/nep", require("./routes/nepRoutes"));
app.use("/api/mcqs", require("./routes/mcqRoutes"));
app.use("/api", require("./routes/topicRoutes"));
app.use("/api/streak", require("./routes/streakRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/aptitude", require("./routes/aptitudeRoutes"));
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
