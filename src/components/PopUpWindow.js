import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { IoClose } from 'react-icons/io5';

const PopupWindow = ({ title, isOpen, onClose, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isTouchDevice) {
        // On mobile, reset position to let CSS handle centering
        setPosition({ x: 0, y: 0 });
      } else {
        // Desktop positioning logic
        const margin = 20;
        const windowWidth = 400;
        const windowHeight = 300;
        const maxX = Math.max(0, window.innerWidth - windowWidth - margin);
        const maxY = Math.max(0, window.innerHeight - windowHeight - margin);
        const randomX = margin + (Math.random() * (maxX - margin));
        const randomY = margin + (Math.random() * (maxY - margin));
        const safeX = Math.min(Math.max(margin, randomX), maxX);
        const safeY = Math.min(Math.max(margin, randomY), maxY);
        setPosition({ x: safeX, y: safeY });
      }
      setZIndex(prev => prev + 1);
    }
  }, [isOpen, isTouchDevice]);

  if (!isOpen) return null;

  const handleStart = () => {
    if (isTouchDevice) return;
    setIsDragging(true);
    setZIndex(prev => prev + 1);
  };

  const handleStop = (e, data) => {
    if (isTouchDevice) return;
    setIsDragging(false);
    
    const margin = 20;
    const windowWidth = 400;
    const windowHeight = 300;
    const maxX = Math.max(0, window.innerWidth - windowWidth - margin);
    const maxY = Math.max(0, window.innerHeight - windowHeight - margin);
    const safeX = Math.min(Math.max(margin, data.x), maxX);
    const safeY = Math.min(Math.max(margin, data.y), maxY);
    setPosition({ x: safeX, y: safeY });
  };

  const windowContent = (
    <div 
      className={`popup-window ${isDragging ? 'active' : ''} ${isTouchDevice ? 'touch-device' : ''}`}
      style={{ 
        zIndex,
        ...(isTouchDevice ? {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        } : {})
      }}
    >
      <div className="window-header">
        <span>{title}</span>
        <button 
          onClick={onClose} 
          className="close-button"
          style={{ padding: isTouchDevice ? '12px' : '8px' }}
        >
          <IoClose />
        </button>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );

  // On touch devices, render without Draggable
  if (isTouchDevice) {
    return windowContent;
  }

  // On desktop, wrap with Draggable
  return (
    <Draggable
      handle=".window-header"
      position={position}
      onStart={handleStart}
      onStop={handleStop}
    >
      {windowContent}
    </Draggable>
  );
};

export default PopupWindow; 