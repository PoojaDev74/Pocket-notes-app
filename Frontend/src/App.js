import React, { useEffect, useState } from 'react';
import GroupList from './components/GroupList';
import NoteList from './components/NoteList';
import GroupPopup from './components/GroupPopup';
import NoteEditor from './components/NoteEditor';
import { fetchNotes, fetchGroups} from './services/api';
// import axios from 'axios';
// import API from './services/api';
import './App.css';

function App() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  // const [text, setText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
        const data = await fetchGroups();
        setGroups(data);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  };

  
  const handleGroupSelect = async (group) => {
    setSelectedGroup(group);
       try {
      const data = await fetchNotes(group._id);
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="header">
          <h1>Pocket Notes</h1>
        </div>
        <GroupList groups={groups} onSelect={handleGroupSelect} selectedGroup={selectedGroup} />
      </div>

      <div className="main">
        {selectedGroup ? (
          <>
            <div className="group-header">
              <div className="group-icon" style={{ backgroundColor: selectedGroup.color }}>
                {selectedGroup.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="heading">{selectedGroup.name}</h3>
            </div>
            <NoteList notes={notes} />
            <NoteEditor groupId={selectedGroup._id} refreshNotes={() => handleGroupSelect(selectedGroup)} />
          </>
        ) : (
          <div className="main-img">
            <img src="https://tse3.mm.bing.net/th?id=OIP.BAXv4W89Wyi62WtoftbtHwHaDt&pid=Api&P=0&h=180" alt="" />
          <div className="empty-state">
            <h2>Pocket Notes</h2>
            <p> Send and receive messages without keeping your phone online.
                <br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div>
          </div>
        )}
        <div className="footer">🔒 end-to-end encrypted</div>
        <button className="add-group-button" onClick={() => setIsPopupOpen(true)}>
          +
        </button>
      </div>
      {isPopupOpen && <GroupPopup onClose={() => setIsPopupOpen(false)} refreshGroups={loadGroups} />}
    </div>
  );
}

export default App;

