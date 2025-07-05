import React, { useState } from 'react';
import { createGroup } from '../services/api';
// import axios from 'axios';
import '../components/GroupPopup.css';

function GroupPopup({ onClose, refreshGroups }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#a879ff');
  // const popupRef = useRef();

  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (popupRef.current && !popupRef.current.contains(e.target)) {
  //       onClose();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => document.removeEventListener('mousedown', handleOutsideClick);
  // }, [onClose]);

  // const getRandomColor = () => {
    const coloroptions= ['#a879ff', '#ff80bf', '#80f0ff', '#ffaa80', '#007bff', '#6691FF'];
  //   return colors[Math.floor(Math.random() * colors.length)];
  // };

    const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = async () => {
    if (groupName.trim().length < 2) {
        createGroup(groupName.trim(),selectedColor);
      setGroupName('');
      onClose();
    } else {
      alert('Group name must be at least 2 characters.');
    }
      // return;
    }

    // const newGroup = {
    //   name: groupName.trim(),
    //   color: getRandomColor(), // ✅ Add color
    // };

  //   console.log("Sending group data:", newGroup);

  //   try {
  //     const res = await axios.post("http://localhost:4000/api/groups", newGroup);
  //     console.log("Group created:", res.data);
  //     refreshGroups();
  //     onClose();
  //   } catch (error) {
  //     console.error('Error creating group:', error);
  //     alert('Failed to create group.');
  //   }
  // };

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Group</h3>
        <h4>Group Name</h4>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        <div>
          <h4>Choose colour</h4>
          <div className="color-palette">
            {coloroptions.map((color) => (
              <div
                key={color}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreateGroup}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default GroupPopup;
