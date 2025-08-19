// src/components/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onEnterGameZone }) => {
  return (
    <div className="landing-page">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="logo"
      >
        ZikCode
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ 
          fontSize: '1.5rem', 
          marginBottom: '3rem', 
          fontWeight: 'normal',
          opacity: 0.9 
        }}
      >
        Ultimate Party Games
      </motion.h2>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="enter-button"
        onClick={onEnterGameZone}
      >
        Enter Game Zone 🎮
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ 
          marginTop: '2rem', 
          fontSize: '0.9rem', 
          opacity: 0.7,
          maxWidth: '400px'
        }}
      >
        Get ready for the ultimate collection of party games! 
        Perfect for friends, couples, and unforgettable nights.
      </motion.div>
    </div>
  );
};

export default LandingPage;