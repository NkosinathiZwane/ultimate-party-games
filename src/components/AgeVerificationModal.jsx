// src/components/AgeVerificationModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AgeVerificationModal = ({ onVerify }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    onVerify(true);
    navigate('/menu');
  };

  const handleNo = () => {
    onVerify(false);
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="modal"
      >
        <h2>Age Verification Required</h2>
        <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
          This application contains mature content. You must be 18 or older to continue.
        </p>
        
        <div className="modal-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button yes-button"
            onClick={handleYes}
          >
            Yes, I'm 18+
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="modal-button no-button"
            onClick={handleNo}
          >
            No, I'm under 18
          </motion.button>
        </div>
        
        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.8rem', 
          opacity: 0.7 
        }}>
          By clicking "Yes", you confirm that you are 18 years or older.
        </div>
      </motion.div>
    </div>
  );
};

export default AgeVerificationModal;