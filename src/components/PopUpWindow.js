import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoClose } from 'react-icons/io5';

const PopupWindow = ({ title, isOpen, onClose, children }) => {
  const [zIndex, setZIndex] = useState(1000);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Center the window when it opens
  useEffect(() => {
    if (isOpen) {
      const windowWidth = 400; // Approximate window width
      const windowHeight = 300; // Approximate window height
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      setPosition({
        x: (screenWidth - windowWidth) / 2,
        y: (screenHeight - windowHeight) / 2
      });
      setZIndex(prevZIndex => prevZIndex + 1); // Bring to front when opened
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => {
    setZIndex(prevZIndex => prevZIndex + 1); // Bring to front when dragged
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      <Draggable
        handle=".window-header"
        position={position}
        onStart={handleStart}
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        <div className="popup-window" style={{ zIndex }}>
          <div className="window-header">
            <span>{title}</span>
            <button onClick={onClose} className="close-button">
              <IoClose />
            </button>
          </div>
          <div className="window-content">
            {children}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default PopupWindow; 