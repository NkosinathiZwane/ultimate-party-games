// src/components/Wheel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Wheel = ({ players, onPlayerSelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedPlayer(null);
    
    // Simulate spinning for 2 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * players.length);
      const chosen = players[randomIndex];
      setSelectedPlayer(chosen);
      setIsSpinning(false);
      onPlayerSelected(chosen);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <motion.div
        animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
        transition={isSpinning ? { 
          duration: 2, 
          ease: "easeOut", 
          repeat: 0 
        } : { duration: 0 }}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '3rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          cursor: isSpinning ? 'not-allowed' : 'pointer'
        }}
        onClick={spinWheel}
      >
        🎯
      </motion.div>
      
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={isSpinning ? 'secondary-button' : 'primary-button'}
        style={{ opacity: isSpinning ? 0.7 : 1 }}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
      
      {selectedPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: '1rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#feca57'
          }}
        >
          Selected: {selectedPlayer}
        </motion.div>
      )}
    </div>
  );
};

export default Wheel;