import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        default: "General",
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true // Prevent modification after creation
    }
}, {
    timestamps: true    // Adds createdAt and updatedAt automatically
});

 // Index for faster user-based queries
NotesSchema.index({ user: 1 }); 

export default mongoose.model('notes', NotesSchema);