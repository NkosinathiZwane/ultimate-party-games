
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onEnterGameZone }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show the logo for 1.75 seconds, then hide it and show the content
    const timer = setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => {
        setShowContent(true);
      }, 500); // Small delay for smooth transition
    }, 1750);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'fixed',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              fontSize: '4rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 3s ease-in-out infinite',
            }}
          >
            ZikCode
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{ 
                fontSize: '2rem', 
                marginBottom: '2rem', 
                fontWeight: 'bold',
                color: '#feca57'
              }}
            >
              Ultimate Party Games
            </motion.h2>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="enter-button"
              onClick={onEnterGameZone}
              style={{ marginBottom: '2rem' }}
            >
              Enter Game Zone 🎮
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{ 
                fontSize: '1rem', 
                opacity: 0.8,
                maxWidth: '400px',
                textAlign: 'center'
              }}
            >
              Get ready for the ultimate collection of party games! 
              Perfect for friends, couples, and unforgettable nights.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;