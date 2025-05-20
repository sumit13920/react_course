import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


const router = express.Router();



//ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

})


//ROUTE 2: Add a new Note using: POST "/api/notes/addnote".Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Validate request body
        //if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }

        // Verify user ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: "Not authorized" });
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        
        res.json({ success: true, note });

    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this Note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;