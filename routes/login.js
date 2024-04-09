// routes/login.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password is correct
        const isPasswordValid = (password === user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // If username and password are correct, create JWT token
        const token = jwt.sign({ username: user.username, role: "customer", org: "CSN" }, 'admin', { expiresIn: '365d' });

        // Send success response with JWT token
        res.status(200).json({ success: true, message: "Login successful", token, data: user });
    } catch (error) {
        // Handle any errors
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
});

module.exports = router;
