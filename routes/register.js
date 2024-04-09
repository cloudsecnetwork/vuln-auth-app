// routes/register.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

router.post('/register', async (req, res, next) => {
    try {
        // Extract user input from request body
        const { username, password, accountBalance, address, dateOfBirth, recoveryCode } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user instance
        const newUser = new User({
            username,
            password,
            accountBalance,
            address,
            dateOfBirth,
            recoveryCode
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ success: true, message: "New User Created", data: newUser });
    } catch (error) {
        // Handle any errors
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Failed to register user" });
    }
});

module.exports = router;
