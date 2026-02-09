const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const User = require("../models/User");

// Initialize Razorpay
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_missing",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "missiong_secret",
});

if (!process.env.RAZORPAY_KEY_ID) {
    console.warn("WARNING: RAZORPAY_KEY_ID is missing in backend/.env. Payment features will fail.");
}

// Create an order
exports.createOrder = async (req, res) => {
    try {
        const { amount, currency, receipt, itemName } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency || "INR",
            receipt: receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).json({ msg: "Some error occured" });
        }

        res.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ msg: "Server Error", error });
    }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            itemName, // Category name essentially
            amount
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // 1. Save Payment
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount,
                user: req.user.id,
                itemName,
                status: "paid",
            });

            await payment.save();

            // 2. Update User (Unlock the item)
            const user = await User.findById(req.user.id);

            // Add to payment history
            user.paymentHistory.push(payment._id);

            // Check if it's the subscription
            if (itemName === "Premium Subscription") {
                user.isPremium = true;
                user.premiumSince = new Date();
                // user.premiumExpiry = ... // Set expiry if needed
            } else {
                // Unlock specific item if not already unlocked
                if (!user.unlockedAssessments.includes(itemName)) {
                    user.unlockedAssessments.push(itemName);
                }
            }

            await user.save();

            res.json({
                msg: "Payment success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        } else {
            res.status(400).json({ msg: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ msg: "Server Error", error });
    }
};
