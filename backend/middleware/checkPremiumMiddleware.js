const User = require('../models/User');

/**
 * Middleware to verify that the authenticated user has an active premium subscription
 * Blocks access if premium has expired
 */
exports.requireActivePremium = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if premium is active using the virtual property
        if (!user.isPremiumActive) {
            // Determine if it's an expiry issue or never had premium
            const premiumExpired = user.isPremium && user.premiumExpiresAt && user.premiumExpiresAt < new Date();

            return res.status(403).json({
                message: premiumExpired ? 'Premium subscription has expired' : 'Premium subscription required',
                premiumExpired: premiumExpired,
                isPremium: user.isPremium,
                expiresAt: user.premiumExpiresAt
            });
        }

        // Premium is active, proceed
        next();
    } catch (err) {
        console.error('[Premium Middleware] Error:', err);
        res.status(500).json({ message: 'Server error checking premium status' });
    }
};
