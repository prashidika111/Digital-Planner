import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Popup from '../components/ui/Popup';

export default function CategoryPage() {
  const { catName } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useLocalStorage(`entries_${catName}`, []);
  const [reminders, setReminders] = useLocalStorage(`reminders_${catName}`, []);
  const [popup, setPopup] = useState({ isOpen: false });

  // Drag state
  const draggedItemIndex = useRef(null);
  const dragOverItemIndex = useRef(null);
  
  const handleSort = () => {
    let _entries = [...entries];
    const draggedItemContent = _entries.splice(draggedItemIndex.current, 1)[0];
    _entries.splice(dragOverItemIndex.current, 0, draggedItemContent);
    draggedItemIndex.current = null;
    dragOverItemIndex.current = null;
    setEntries(_entries);
  };

  const addEntry = () => {
    setPopup({
      isOpen: true,
      text: "Entry name:",
      defaultValue: "",
      onSubmit: (name) => {
        if(name) {
          const patterns = ["folder-1", "folder-2", "folder-3", "folder-4", "folder-5", "folder-6"];
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          setEntries([...entries, { name, pattern }]);
        }
        setPopup({ isOpen: false });
      },
      onClose: () => setPopup({ isOpen: false })
    });
  };

  const openEntryOptions = (e, entry, idx) => {
    e.preventDefault();
    setPopup({
      isOpen: true,
      text: "Entry options",
      options: [
        { label: "Open", action: () => { setPopup({isOpen:false}); navigate(`/home/${catName}/${entry.name}`); } },
        { label: "Rename", action: () => {
            setPopup({
              isOpen: true,
              text: "New name:",
              defaultValue: entry.name,
              onSubmit: (newName) => {
                if(newName) {
                  const next = [...entries];
                  next[idx].name = newName;
                  setEntries(next);
                }
                setPopup({isOpen: false});
              },
              onClose: () => setPopup({ isOpen: false })
            })
        }},
        { label: "Delete", action: () => {
            setEntries(entries.filter((_, i) => i !== idx));
            setPopup({isOpen: false});
        }}
      ],
      onClose: () => setPopup({ isOpen: false })
    });
  };

  // Reminders
  const addReminder = () => setReminders([...reminders, '']);
  const updateReminder = (idx, val) => {
    const next = [...reminders];
    next[idx] = val;
    setReminders(next);
  };
  const removeReminder = (idx) => setReminders(reminders.filter((_, i) => i !== idx));

  return (
    <>
      <div id="categoryPage">
        <button onClick={() => navigate('/home')} className="back-btn">← back</button>

        <div className="category-header">
          <div className="quote-strip editable-quote" contentEditable="true" suppressContentEditableWarning>
            write your thoughts here...
          </div>
          <h2 id="categoryTitle">°❀⋆.ೃ࿔*:･ {catName}</h2>
        </div>

        <div className="category-layout">
          {/* DASHBOARD */}
          <div className="cat-left">
            <h3>dashboard</h3>
            <button onClick={addEntry}>+ add new entry</button>
            <div id="entryList" className="entry-list">
              {entries.map((entry, idx) => (
                <div 
                  key={idx}
                  className={`entry-folder ${entry.pattern || 'folder-1'}`}
                  draggable
                  onDragStart={() => (draggedItemIndex.current = idx)}
                  onDragEnter={() => (dragOverItemIndex.current = idx)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => navigate(`/home/${catName}/${entry.name}`)}
                  onContextMenu={(e) => openEntryOptions(e, entry, idx)}
                >
                  {entry.name || entry} {/* fallback if it gets old plain string struct */}
                </div>
              ))}
            </div>
          </div>

          {/* REMINDERS */}
          <div className="cat-right">
            <h3>reminders</h3>
            <button onClick={addReminder}>+ add</button>
            <div id="reminderList">
              {reminders.map((rem, i) => (
                <div className="item" key={i}>
                  <input type="text" placeholder="reminder" value={rem} onChange={e => updateReminder(i, e.target.value)} />
                  <button onClick={() => removeReminder(i)}>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Popup {...popup} />
    </>
  );
}
