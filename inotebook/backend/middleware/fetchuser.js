import jwt from "jsonwebtoken";

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'hariomisgoodbo$y';

const fetchuser = async (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token');
    
    if (!token) {
         return res.status(401).json({ error: "Access denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                success: false,
                error: "Token expired. Please login again."
            });
        }

        // Attach user to request
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        
        let errorMessage = "Invalid token. Please authenticate again.";
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Session expired. Please login again.";
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = "Invalid token. Please login again.";
        }

        return res.status(401).json({
            success: false,
            error: errorMessage
        });
    }
};

export default fetchuser;
