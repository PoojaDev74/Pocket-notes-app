import React from 'react';
import './NoteList.css';

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month} ${year}    ${time}`;
}

const NoteList = ({ notes }) => {
  if (!Array.isArray(notes)) {
    console.error('NoteList expected an array, got:', notes);
    return <div className="note-list">Invalid notes data.</div>;
  }

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="empty-notes">No notes found for this group.</p>
      ) : (
        notes.map((note) => (
          <div className="note-card" key={note._id}>
            <div className="note-text">{note.text}</div>
            {note.createdAt && (
              <p className="note-date">
               {formatDateTime(note.createdAt)}
              </p> 
             )}
          </div>
        ))
      )}
    </div>
  );
};



export default NoteList;