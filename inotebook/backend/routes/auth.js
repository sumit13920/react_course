import express from 'express';
import User from '../models/User.js'; // Fixed import syntax

const router = express.Router();

// Create a User using: POST "/api/auth/" (changed from GET to POST)
router.post('/', async (req, res) => { // Added async and proper HTTP method
    try {
        console.log('Request body:', req.body);
        
        // Create new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Save to database
        const savedUser = await newUser.save();
        
        // Send proper response
        res.status(201).json({
            success: true,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                createdAt: savedUser.createdAt
            }
        });
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;