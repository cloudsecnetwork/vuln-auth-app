const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Admin route to get all users and transactions
router.get('/', async (req, res) => {
    try {
        // Fetch all users and transactions from the database
        const users = await User.find();
        const transactions = await Transaction.find();

        // Return the list of users and transactions
        res.status(200).json({
            success: true,
            message: "Users and transactions successfully retrieved",
            data: {
                users,
                transactions
            }
        });
    } catch (error) {
        console.error('Error fetching users and transactions:', error);
        res.status(500).json({ success: false, message: "Failed to fetch users and transactions" });
    }
});

module.exports = router;