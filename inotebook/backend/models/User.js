import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating auth tokens


const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {  // Changed to lowercase 'password' for consistency
        type: String,
        required: true,
        minlength: 5,
        select: false // Prevents password from being returned in queries
    },
    createdAt: {  // Better field name with explicit schema option
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt automatically
    collection: 'users'  // Explicit collection naming
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

// Static method for finding by token (for authentication)
UserSchema.statics.findByToken = async function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await this.findById(decoded.id).select('-password');
    } catch (error) {
        throw new Error('Invalid token');
    }
};


// Create and export the model
const User = mongoose.model('User', UserSchema);
export default User;