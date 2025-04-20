import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoClose } from 'react-icons/io5';

const PopupWindow = ({ title, isOpen, onClose, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Calculate safe margins
      const margin = 20;
      const windowWidth = 400; // Approximate window width
      const windowHeight = 300; // Approximate window height
      
      // Calculate maximum safe positions
      const maxX = Math.max(0, window.innerWidth - windowWidth - margin);
      const maxY = Math.max(0, window.innerHeight - windowHeight - margin);
      
      // Generate random position within safe bounds
      const randomX = margin + (Math.random() * (maxX - margin));
      const randomY = margin + (Math.random() * (maxY - margin));

      // Ensure position is within viewport bounds
      const safeX = Math.min(Math.max(margin, randomX), maxX);
      const safeY = Math.min(Math.max(margin, randomY), maxY);

      setPosition({ x: safeX, y: safeY });
      setZIndex(prev => prev + 1); // Bring to front when opened
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsDragging(true);
    setZIndex(prev => prev + 1); // Bring to front when dragged
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    
    // Ensure window stays within viewport bounds
    const margin = 20;
    const windowWidth = 400;
    const windowHeight = 300;
    
    const maxX = Math.max(0, window.innerWidth - windowWidth - margin);
    const maxY = Math.max(0, window.innerHeight - windowHeight - margin);
    
    const safeX = Math.min(Math.max(margin, data.x), maxX);
    const safeY = Math.min(Math.max(margin, data.y), maxY);
    
    setPosition({ x: safeX, y: safeY });
  };

  return (
    <Draggable
      handle=".window-header"
      position={position}
      onStart={handleStart}
      onStop={handleStop}
    >
      <div 
        className={`popup-window ${isDragging ? 'active' : ''}`}
        style={{ zIndex }}
      >
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
  );
};

export default PopupWindow; 