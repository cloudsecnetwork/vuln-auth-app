const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Import the Transaction model
const User = require('../models/User'); // Import the User model

router.get('/transactions/:reference', async (req, res) => {
    try {
        // Extract transaction reference from the request parameters
        const { reference } = req.params;

        // Find transaction by reference in the database
        const transaction = await Transaction.findOne({ reference });

        // If transaction is not found, return an error response
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        // Find user by ID in the database
        const user = await User.findById(transaction.userId);

        // If user is not found, return an error response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return the transaction details along with user information
        res.status(200).json({
            success: true,
            message: "Details successfully retrieved",
            data: {
                transaction,
                user
            }
        });
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        res.status(500).json({ success: false, message: "Failed to fetch transaction details" });
    }
});

module.exports = router;
