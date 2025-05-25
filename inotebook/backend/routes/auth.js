import express from 'express';
import User from '../models/User.js'; // Fixed import syntax
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from '../middleware/fetchuser.js';
 
const router = express.Router();

// Move JWT secret to environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'hariomisgoodbo$y';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';


// ROUTE 1: Create a User - POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }).trim(),
    body('email', 'Enter a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: "A user with this email already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Generate token
        const payload = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        // Return response without password
        const userData = user.toObject();
        delete userData.password;

        res.status(201).json({
            success: true,
            authtoken,
            user: userData
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ 
            success: false,
            error: "Server error during user creation" 
        });
    }
});

// ROUTE 2: Authenticate User - POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail().normalizeEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: "Invalid credentials" 
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                error: "Invalid credentials" 
            });
        }

        // Generate token
        const payload = { userId: user._id };

        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        // Return response without password
        const userData = user.toObject();
        delete userData.password;

        res.json({ 
            success: true,
            authtoken,
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            error: "Server error during login" 
        });
    }
});

//ROUTE 3:Get loggedin using: POST "/api/auth/getuser" .Login required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: "User not found" 
            });
        }
        res.json({ 
            success: true,
            user 
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ 
            success: false,
            error: "Server error fetching user data" 
        });
    }
});

export default router;