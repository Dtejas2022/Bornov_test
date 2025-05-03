const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");

// add new entry 
router.post('/', async (req,res)=>{
    try{
        const {title, content} = req.body;
        const newNote = new Notes({title,content});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

//show all notes

router.get('/', async (req,res)=>{
    try {
        const notes = await Notes.find().sort( {createdAt: -1});
        res.json(notes);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;