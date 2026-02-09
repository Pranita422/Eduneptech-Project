const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } else {
        const keyPath = path.join(__dirname, "../serviceAccountKey.json");
        if (fs.existsSync(keyPath)) {
            serviceAccount = require(keyPath);
        }
    }

    if (serviceAccount && !admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("[Firebase Admin] Initialized Successfully for project:", serviceAccount.project_id);
    } else if (!serviceAccount) {
        console.warn("⚠️ [Firebase Admin] Service account key missing. Backend auth verification will fail.");
        console.warn("Please place 'serviceAccountKey.json' in your backend folder.");
    }
} catch (error) {
    console.error("❌ [Firebase Admin] Initialization error:", error.message);
}

module.exports = admin;
