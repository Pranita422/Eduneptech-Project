//authroutes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  updateSettings,
  googleLogin,
  forgotPassword,
  resetPassword,
  changePassword
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/settings", authMiddleware, updateSettings);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.put("/change-password", authMiddleware, changePassword);


module.exports = router;
