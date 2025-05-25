import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

// Helper function for handling errors
const handleError = (res, error, message = 'Server error') => {
  console.error(`Error: ${message}`, error);
  return res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? error.message 
      : message
  });
};

// Validate MongoDB ID format
const validateMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

// ROUTE 1: Get All Notes - GET "/api/notes/fetchallnotes" (Login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id }).lean();
    res.json(notes);
  } catch (error) {
    handleError(res, error, 'Failed to fetch notes');
  }
});

// ROUTE 2: Add New Note - POST "/api/notes/addnote" (Login required)
router.post('/addnote', fetchuser, [
  body('title', 'Title must be 3-100 characters')
    .trim().isLength({ min: 3, max: 100 }),
  body('description', 'Description must be 5-1000 characters')
    .trim().isLength({ min: 5, max: 1000 }),
  body('tag', 'Tag must be 2-50 characters')
    .optional().trim().isLength({ min: 2, max: 50 })
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, tag = 'General' } = req.body;
    
    const newNote = await Notes.create({
      title,
      description,
      tag,
      user: req.user.id
    });
   res.status(201).json(newNote);
  } catch (error) {
    handleError(res, error, 'Failed to create note');
  }
});

// ROUTE 3: Update Note - PUT "/api/notes/updatenote/:id" (Login required)
router.put('/updatenote/:id', fetchuser, [
  body('title', 'Title must be 3-100 characters')
    .optional().trim().isLength({ min: 3, max: 100 }),
  body('description', 'Description must be 5-1000 characters')
    .optional().trim().isLength({ min: 5, max: 1000 }),
  body('tag', 'Tag must be 2-50 characters')
    .optional().trim().isLength({ min: 2, max: 50 })
], async (req, res) => {
  try {
    // Validate ID format
    if (!validateMongoId(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid note ID format'
      });
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Find and validate note
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access'
      });
    }

    // Prepare update data
    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.tag) updateData.tag = req.body.tag;

    // Perform update
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedNote
    });

  } catch (error) {
    handleError(res, error, 'Failed to update note');
  }
});

// ROUTE 4: Delete Note - DELETE "/api/notes/deletenote/:id" (Login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Validate ID format
    if (!validateMongoId(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid note ID format'
      });
    }

    // Find and validate note
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access'
      });
    }

    // Perform deletion
    await Notes.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: null,
      message: 'Note deleted successfully'
    });

  } catch (error) {
    handleError(res, error, 'Failed to delete note');
  }
});

export default router;