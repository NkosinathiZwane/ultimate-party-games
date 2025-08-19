// src/components/PlayerResultModal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PlayerResultModal = ({ player, onChooseAction }) => {
  if (!player) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="modal"
      >
        <h2>🎉 It's {player}'s Turn!</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9, fontSize: '1.1rem' }}>
          What will it be?
        </p>
        
        <div className="modal-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button yes-button"
            onClick={() => onChooseAction('truth')}
          >
            Truth 🤔
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button no-button"
            onClick={() => onChooseAction('dare')}
          >
            Dare 💪
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerResultModal;