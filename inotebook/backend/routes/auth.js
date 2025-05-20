import express from 'express';
import User from '../models/User.js'; // Fixed import syntax
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from '../middleware/fetchuser.js';
 


const JWT_SECRET = 'Harryisgoodb$oy';

const router = express.Router();



//ROUTE 1: Create a User using: POST "/api/auth/createuser" .No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    //if there are errors, refturn Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists alredy
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "sorry a user with this email already exists" })
    }
    try {
        console.log('Request body:', req.body);

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Save to database
        const savedUser = await newUser.save();

        const data = {
            user: {
                id: savedUser._id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        // Send proper response
        res.status(201).json({
            success: true,
            user: {
                authtoken: authtoken,
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
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
    //  res.json(user)
});

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" .No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to login with correct Credentials" });
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

//ROUTE 3:Get loggedin using: POST "/api/auth/getuser" .Login required
router.post('/getuser',fetchuser,  async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message });
    }
});
export default router;
//module.exports = router