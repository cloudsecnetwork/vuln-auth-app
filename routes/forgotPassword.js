// routes/forgotPassword.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Function to generate a random password
function generatePassword() {
    const characters = 'abcdefghjkmnpqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

router.post('/forgot-password', async (req, res, next) => {
    try {
        const { username, recoveryCode } = req.body;

        // Find the user by username and recovery code
        const user = await User.findOne({ username, recoveryCode });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid username or recovery code" });
        }

        // Generate a new password
        const newPassword = generatePassword();

        // Update the user's password
        user.password = newPassword;
        await user.save();

        // Return the new password to the user
        res.status(200).json({ success: true, message: "New password generated", newPassword });
    } catch (error) {
        console.error("Error generating new password:", error);
        res.status(500).json({ success: false, message: "Failed to generate new password" });
    }
});

module.exports = router;
