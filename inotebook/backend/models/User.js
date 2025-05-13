import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
        minlength: 6
    },
    createdAt: {  // Better field name with explicit schema option
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt automatically
    collection: 'users'  // Explicit collection naming
});

// Create and export the model
const User = mongoose.model('User', UserSchema);
export default User;