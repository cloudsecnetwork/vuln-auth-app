const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
    // Extract token from request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) {
        // If token is not provided, send 401 Unauthorized response
        return res.status(401).json({ success: false, message: "Access token not provided or wrong format" });
    }

    // Verify the token
    jwt.verify(token, 'admin', (err, decoded) => {
        if (err) {
            // If token verification fails, send 403 Forbidden response
            return res.status(401).json({ success: false, message: "Invalid or expired auth token" });
        }
        // If token is valid, attach the decoded payload to the request object
        req.user = decoded;
        next(); // Call the next middleware or route handler
    });
};

module.exports = authenticateToken;
