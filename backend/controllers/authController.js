//authController.js 
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // --- STREAK UPDATE ON LOGIN ---
    const today = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

    if (!lastActive) {
      user.streak = 1;
    } else {
      const d1 = new Date(lastActive);
      const d2 = new Date(today);
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
    }
    user.lastActiveDate = today;
    await user.save();
    // -----------------------------

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        streak: user.streak // Return streak in login response
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetToken");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Include premium status info
    const userData = user.toObject(); // Convert to object to include virtuals
    res.json({ user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        picture,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password for social login
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Update streak on login
    const today = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    if (!lastActive) {
      user.streak = 1;
    } else {
      const d1 = new Date(lastActive);
      const d2 = new Date(today);
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
    }
    user.lastActiveDate = today;
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        streak: user.streak,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ error: "Google Authentication failed" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetToken field
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send Email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    console.log("-----------------------------------------");
    console.log("PASSWORD RESET LINK (Dev Mode):", resetUrl);
    console.log("-----------------------------------------");

    // Only send email if credentials are provided
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== "your_email@gmail.com") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Eduneptech" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Password Reset Request",
          html: `
            <h3>You requested a password reset</h3>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 10 minutes.</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Reset link sent to your email" });
      } catch (mailError) {
        console.error("Mail sending failed:", mailError);
        // If mail fails, we still return success because we logged it to the terminal for dev
        return res.status(200).json({
          message: "Reset link generated! (Mail failed, but link is logged in the backend terminal)",
          devLink: resetUrl
        });
      }
    } else {
      // No credentials, just return success since we logged it to console
      return res.status(200).json({
        message: "Reset link generated! Check your backend terminal for the link.",
        devLink: resetUrl
      });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
};

exports.resetPassword = async (req, res) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    console.log(`[Auth] Updating profile for user ${req.user.id}: name=${name}, photoURL=${photoURL}`);

    const updateData = {};
    if (name) updateData.name = name;
    if (photoURL) updateData.picture = photoURL;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!user) {
      console.warn(`[Auth] User ${req.user.id} not found for profile update`);
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(`[Auth] Profile updated successfully for ${req.user.id}`);
    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.error("[Auth] Profile update error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { preferences } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Deep merge or specific field update to avoid overwriting all preferences
    if (preferences) {
      if (preferences.notifications !== undefined) {
        user.preferences.notifications = preferences.notifications;
      }
      if (preferences.theme !== undefined) {
        user.preferences.theme = preferences.theme;
      }
    }

    await user.save();
    res.json({ msg: "Settings updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
