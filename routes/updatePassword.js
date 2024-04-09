const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const User = require('../models/User'); // Import the User model

// Route to update user's password
router.post('/update-password', authenticateToken, async (req, res) => {
    try {
        // Destructure username from req.user
        const { username } = req.user;

        // Destructure oldPassword and newPassword from req.body
        const { oldPassword, newPassword } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // If user is not found, return error
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if old password matches
        if (oldPassword !== user.password) {
            return res.status(401).json({ success: false, message: 'Old password is incorrect' });
        }

        // Update user's password
        await User.findOneAndUpdate({ username }, { password: newPassword });

        // Send success response
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error updating password:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
