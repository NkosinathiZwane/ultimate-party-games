// src/components/Timer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = ({ duration, onTimeUp, isActive, onStop }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <motion.div
        animate={isWarning ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isWarning ? Infinity : 0 }}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `conic-gradient(${isWarning ? '#ff6b6b' : '#48dbfb'} ${percentage * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: isWarning ? '#ff6b6b' : '#48dbfb',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        {timeLeft}
      </motion.div>
      
      <div style={{ marginTop: '1rem' }}>
        {isActive ? (
          <button onClick={onStop} className="secondary-button">
            Stop Timer
          </button>
        ) : (
          <div style={{ opacity: 0.7 }}>
            {timeLeft === 0 ? "Time's Up!" : "Timer Ready"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;