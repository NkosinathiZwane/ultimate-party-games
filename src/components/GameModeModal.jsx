// src/components/GameModeModal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const GameModeModal = ({ isOpen, onClose, onSelectMode, gameTitle }) => {
  if (!isOpen) return null;

  const handleModeSelect = (mode) => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="modal"
      >
        <h2>Choose Game Mode</h2>
        <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
          Select how you want to play {gameTitle}
        </p>
        
        <div className="modal-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button yes-button"
            onClick={() => handleModeSelect('casual')}
          >
            😊 Casual Mode
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button no-button"
            onClick={() => handleModeSelect('couple')}
          >
            💕 Couple Mode
          </motion.button>
        </div>
        
        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.8rem', 
          opacity: 0.7 
        }}>
          💕 Couple Mode: More intimate and romantic content
        </div>
      </motion.div>
    </div>
  );
};

export default GameModeModal;