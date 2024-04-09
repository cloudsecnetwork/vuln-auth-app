const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const User = require('../models/User'); // Import the User model
const Transaction = require('../models/Transaction'); // Import the Transaction model

router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        // Extract username from the token payload
        const { username } = req.user;

        // Find the user by username in the database
        const user = await User.findOne({ username });

        // If user is not found, return an error response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find transactions associated with the user
        const transactions = await Transaction.find({ userId: user._id });

        // Construct the response data including both user data and transactions
        const data = {
            user: user,
            transactions: transactions,
            token_payload: req.user
        };

        // Send the response with the constructed data
        res.json({ success: true, message: "Access granted", data });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user data" });
    }
});

module.exports = router;
