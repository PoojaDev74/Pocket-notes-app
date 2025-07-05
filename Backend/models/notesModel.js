const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
     groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});
  

const Note = new mongoose.model("Note", noteSchema);

module.exports = Note;