import React, { useState } from 'react';
import './NoteEditor.css';
import { createNote } from '../services/api';

function NoteEditor({ groupId, refreshNotes }) {
  const [noteInput, setNoteInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && noteInput.trim()) {
      e.preventDefault();
      saveNote();
    }
  };

  const saveNote = async () => {
    const noteData = {
      text: noteInput.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      console.log("Sending note to groupId:", groupId);
      await createNote(groupId, noteData);
      setNoteInput('');
      refreshNotes(); // Reload notes for this group
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="note-editor">
     <div className="note-input">
      <textarea
        type="text"
        placeholder="Enter your text here..."
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={3}
      />
      <button
        className={`send-btn ${noteInput.trim() ? 'active' : ''}`}
        onClick={saveNote}
        disabled={!noteInput.trim()}
      >
        ➤
      </button>
     </div>
    </div>
  );
}

export default NoteEditor;
