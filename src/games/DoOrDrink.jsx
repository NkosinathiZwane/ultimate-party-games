// src/games/DoOrDrink.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gameContent } from '../data/gameContent';

const DoOrDrink = () => {
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeCount, setChallengeCount] = useState(0);
  const [usedChallenges, setUsedChallenges] = useState([]);

  const getRandomChallenge = () => {
    const availableChallenges = gameContent.doOrDrink.filter(
      challenge => !usedChallenges.includes(challenge)
    );
    
    if (availableChallenges.length === 0) {
      // Reset used challenges if we've gone through all
      setUsedChallenges([]);
      return gameContent.doOrDrink[Math.floor(Math.random() * gameContent.doOrDrink.length)];
    }
    
    return availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
  };

  const drawChallenge = () => {
    const challenge = getRandomChallenge();
    setCurrentChallenge(challenge);
    setUsedChallenges(prev => [...prev, challenge]);
    setShowChallenge(true);
    setChallengeCount(prev => prev + 1);
  };

  const handleAction = (action) => {
    setShowChallenge(false);
    setCurrentChallenge('');
    
    // Show result message briefly
    setTimeout(() => {
      if (action === 'drink') {
        // Could add drinking animation or sound effect here
      }
    }, 500);
  };

  const resetGame = () => {
    setCurrentChallenge('');
    setShowChallenge(false);
    setChallengeCount(0);
    setUsedChallenges([]);
  };

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">🍹 Do or Drink</h1>
        <p>Face the challenge or take a sip - your choice!</p>
      </div>

      {/* Game Stats */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        opacity: 0.8 
      }}>
        <p>Challenges completed: <strong>{challengeCount}</strong></p>
        {usedChallenges.length > 0 && (
          <p>Remaining challenges: <strong>{gameContent.doOrDrink.length - usedChallenges.length}</strong></p>
        )}
      </div>

      {!showChallenge ? (
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '3rem 2rem',
              borderRadius: '25px',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              🎲
            </div>
            <h2 style={{ marginBottom: '1rem', color: '#feca57' }}>
              Ready for a Challenge?
            </h2>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
              Draw a card and decide your fate!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={drawChallenge}
              className="primary-button"
              style={{ 
                fontSize: '1.3rem', 
                padding: '1.2rem 2.5rem',
                background: 'linear-gradient(45deg, #ff6b6b, #feca57)'
              }}
            >
              Draw Challenge! 🃏
            </motion.button>
          </motion.div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '15px',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.8
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#48dbfb' }}>
              How to Play:
            </h3>
            <ul style={{ 
              textAlign: 'left', 
              lineHeight: '1.6',
              listStyleType: 'none',
              padding: 0
            }}>
              <li>🎯 Draw a challenge card</li>
              <li>💪 Either complete the challenge</li>
              <li>🍻 Or take a drink and pass</li>
              <li>🔄 Keep going until everyone's had fun!</li>
            </ul>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                padding: '2rem',
                borderRadius: '20px',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                🎯
              </div>
              <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>
                Your Challenge:
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                lineHeight: '1.4',
                color: 'white',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '1.5rem',
                borderRadius: '15px'
              }}>
                {currentChallenge}
              </p>
            </motion.div>

            <div style={{ marginTop: '2rem' }}>
              <p style={{ 
                marginBottom: '2rem', 
                fontSize: '1.1rem',
                opacity: 0.9 
              }}>
                What's it gonna be?
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('do')}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #48dbfb, #0abde3)',
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    cursor: 'pointer',
                    minWidth: '150px'
                  }}
                >
                  💪 I'll Do It!
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('drink')}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    cursor: 'pointer',
                    minWidth: '150px'
                  }}
                >
                  🍻 I'll Drink!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button onClick={resetGame} className="secondary-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default DoOrDrink;