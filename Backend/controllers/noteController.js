const Note = require("../models/notesModel");

// Create data //
const createNote = async (req, res) => {
  try {
      const { content } = req.body;
      const { groupId } = req.params;

      const newNote = new Note({
          groupId,
          content
      });

      await newNote.save();
      res.status(201).json(newNote);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving note", error });
  }
};


// Get a single data //
const getNote = async (req, res) => {
    const notes = await Note.find({ groupId: req.params.groupId }).sort({ timestamp: 1 });
  res.json(notes);
};

// Update data //
const editNote = async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
};

// Delete dta //
const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
};


module.exports = {
    getNote,
    createNote,
    editNote,
    deleteNote,
};