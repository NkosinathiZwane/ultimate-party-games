// src/components/QuestionModal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const QuestionModal = ({ type, question, player, onNext, onClose }) => {
  if (!question) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="modal"
        style={{ maxWidth: '500px' }}
      >
        <h2>{type === 'truth' ? '🤔 Truth' : '💪 Dare'}</h2>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '15px',
          margin: '1.5rem 0',
          fontSize: '1.1rem',
          lineHeight: '1.4'
        }}>
          {question}
        </div>
        
        {player && (
          <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
            For: <strong>{player}</strong>
          </p>
        )}
        
        <div className="modal-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button yes-button"
            onClick={onNext}
          >
            Next Round
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button no-button"
            onClick={onClose}
          >
            End Game
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionModal;