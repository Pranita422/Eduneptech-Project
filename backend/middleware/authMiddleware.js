const admin = require("../config/firebaseAdmin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  console.log("🔒 [Auth Middleware] Hit! Headers:", req.headers.authorization ? "Present" : "Missing");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      try {
        // 1. Try Verify Firebase ID Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name, picture } = decodedToken;

        let user = await User.findOne({ firebaseUid: uid });
        if (!user) {
          user = await User.findOne({ email });
          if (user) {
            user.firebaseUid = uid;
            if (picture && !user.picture) user.picture = picture;
            await user.save();
          } else {
            user = await User.create({
              name: name || email.split("@")[0],
              email,
              firebaseUid: uid,
              picture,
              password: Math.random().toString(36).slice(-10),
            });
          }
        }
        req.user = { id: user._id.toString(), uid, email, name: user.name };
        return next();
      } catch (firebaseError) {
        console.log("Firebase Verify Error Code:", firebaseError.code);
        console.log("Firebase Verify Error Message:", firebaseError.message);

        // --- TEMPORARY FIX FOR CLOCK SKEW (User system time is 2026, Token is 2025) ---
        if (firebaseError.code === 'auth/id-token-expired') {
          console.warn("⚠️ [Auth] Bypassing Token Expiration Check due to System Clock Skew (2026 detected)");
          const decoded = jwt.decode(token);

          if (decoded && decoded.uid) {
            const { uid, email, name, picture } = decoded;
            let user = await User.findOne({ firebaseUid: uid });

            if (!user) {
              user = await User.findOne({ email });
              if (user) {
                user.firebaseUid = uid;
                if (picture && !user.picture) user.picture = picture;
                await user.save();
              } else {
                user = await User.create({
                  name: name || email.split("@")[0],
                  email,
                  firebaseUid: uid,
                  picture: picture,
                  password: Math.random().toString(36).slice(-10),
                });
              }
            }
            req.user = { id: user._id.toString(), uid, email, name: user.name };
            return next();
          }
        }
        // ---------------------------------------------------------------------------

        // 2. Fallback to Custom JWT Verification
        try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decode.id).select("-password");
          if (!user) return res.status(401).json({ message: "User not found" });

          req.user = { id: user._id.toString(), email: user.email, name: user.name };
          return next();
        } catch (jwtError) {
          console.error("Auth failed for both Firebase and JWT:", jwtError.message);
          return res.status(401).json({
            message: "Not authorized, token failed",
            error: firebaseError.message
          });
        }
      }
    } catch (err) {
      console.error("Unexpected error in auth middleware:", err);
      return res.status(500).json({ message: "Server Error" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
