const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/notesModel");

router.get('/:groupId', async (req, res) => {
   const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Invalid group ID format." });
  }
  try {
    const notes = await Note.find({ groupId: req.params.groupId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
     console.error('Error fetching notes:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/:groupId', async (req, res) => {
    const { groupId } = req.params;
  const { text, createdAt } = req.body;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Invalid group ID format." });
  }
  try {
    const newNote = new Note({
      groupId,
      text,
      createdAt: createdAt || new Date().toISOString()
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
