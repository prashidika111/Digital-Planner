import React, { useState, useEffect } from 'react';

export default function Popup({ isOpen, text, defaultValue = "", options = [], onSubmit, onClose }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue, isOpen]);

  if (!isOpen) return null;

  return (
    <div id="popup" className="popup">
      <div className="popup-box">
        <p id="popupText">{text}</p>
        
        {options.length === 0 && (
          <input 
            type="text" 
            id="popupInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
        )}
        
        {options.length > 0 && (
          <div id="popupOptions">
            {options.map((opt, i) => (
              <button key={i} onClick={() => {
                if(opt.action) opt.action();
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {options.length === 0 && (
          <div className="popup-actions mt-4 flex gap-2 justify-center">
            <button onClick={() => onSubmit(inputValue)}>OK</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        )}

        {options.length > 0 && (
          <div className="popup-actions mt-4 flex gap-2 justify-center">
             <button onClick={onClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
