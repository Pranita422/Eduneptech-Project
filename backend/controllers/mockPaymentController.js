const User = require("../models/User");
const Payment = require("../models/Payment");

/**
 * Mock Payment Controller
 * Simulates payment success for development/testing
 */

exports.simulatePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount, itemName } = req.body;

        console.log(`[Mock Payment] Simulating payment for user ${userId}: ${itemName} - ₹${amount}`);

        // Update user to premium
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isPremium = true;
        user.premiumExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
        await user.save();

        // Create mock payment record
        const payment = new Payment({
            userId,
            razorpayOrderId: `mock_order_${Date.now()}`,
            razorpayPaymentId: `mock_payment_${Date.now()}`,
            razorpaySignature: `mock_signature_${Date.now()}`,
            amount: amount || 999,
            currency: "INR",
            status: "success",
            itemName: itemName || "Premium Subscription"
        });
        await payment.save();

        console.log(`[Mock Payment] User ${userId} upgraded to premium (expires: ${user.premiumExpiresAt})`);

        res.json({
            success: true,
            message: "Mock payment successful! Premium access granted.",
            user: {
                isPremium: user.isPremium,
                premiumExpiresAt: user.premiumExpiresAt
            },
            payment: {
                orderId: payment.razorpayOrderId,
                paymentId: payment.razorpayPaymentId
            }
        });

    } catch (error) {
        console.error("[Mock Payment] Error:", error);
        res.status(500).json({
            success: false,
            message: "Mock payment failed",
            error: error.message
        });
    }
};
