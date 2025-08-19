// src/games/SixSeconds.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import { gameContent } from '../data/gameContent';

const SixSeconds = () => {
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);

  const startChallenge = () => {
    const randomChallenge = gameContent.six[Math.floor(Math.random() * gameContent.six.length)];
    setCurrentChallenge(randomChallenge);
    setGameState('playing');
    setTimerActive(true);
    setTotalChallenges(prev => prev + 1);
  };

  const handleTimeUp = () => {
    setTimerActive(false);
    setStreak(0);
    setGameState('finished');
  };

  const handleSuccess = () => {
    setScore(prev => prev + 1);
    setStreak(prev => prev + 1);
    setTimerActive(false);
    setGameState('ready');
    setCurrentChallenge('');
  };

  const handleFail = () => {
    setStreak(0);
    setTimerActive(false);
    setGameState('ready');
    setCurrentChallenge('');
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTotalChallenges(0);
    setGameState('ready');
    setCurrentChallenge('');
    setTimerActive(false);
  };

  const getStreakMessage = () => {
    if (streak >= 10) return "🔥 ON FIRE! 🔥";
    if (streak >= 5) return "🌟 Hot Streak! 🌟";
    if (streak >= 3) return "⚡ Getting Hot! ⚡";
    return "";
  };

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">⚡ 6 Seconds</h1>
        <p>Lightning fast challenges - think quick or fail!</p>
      </div>

      {/* Score Display */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <motion.div
          animate={score > 0 ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          style={{
            background: 'linear-gradient(45deg, #48dbfb, #0abde3)',
            padding: '1rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            minWidth: '100px'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {score}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Correct
          </div>
        </motion.div>

        <motion.div
          animate={streak > 0 ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
            padding: '1rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            minWidth: '100px'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {streak}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Streak
          </div>
        </motion.div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 2rem',
          borderRadius: '20px',
          textAlign: 'center',
          minWidth: '100px'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {totalChallenges > 0 ? Math.round((score / totalChallenges) * 100) : 0}%
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Success Rate
          </div>
        </div>
      </div>

      {/* Streak Message */}
      {getStreakMessage() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '2rem',
            color: '#feca57'
          }}
        >
          {getStreakMessage()}
        </motion.div>
      )}

      {gameState === 'ready' && (
        <div style={{ textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChallenge}
            className="primary-button"
            style={{ fontSize: '1.3rem', padding: '1.2rem 2.5rem' }}
          >
            Start Challenge! ⚡
          </motion.button>
          
          <div style={{ marginTop: '2rem', opacity: 0.8 }}>
            <p>Get ready for a lightning-fast challenge!</p>
            <p>You'll have exactly 6 seconds to complete it.</p>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '20px',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}
          >
            <h2 style={{ color: '#feca57', marginBottom: '1.5rem' }}>
              Your Challenge:
            </h2>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', lineHeight: '1.4' }}>
              {currentChallenge}
            </p>
          </motion.div>

          <Timer
            duration={6}
            onTimeUp={handleTimeUp}
            isActive={timerActive}
            onStop={() => setTimerActive(false)}
          />

          {!timerActive && (
            <div style={{ marginTop: '2rem' }}>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                Did you complete the challenge in time?
              </p>
              <button onClick={handleSuccess} className="primary-button">
                ✅ Yes, I did it!
              </button>
              <button onClick={handleFail} className="secondary-button">
                ❌ No, I failed
              </button>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(255, 107, 107, 0.2)',
              padding: '2rem',
              borderRadius: '20px',
              marginBottom: '2rem'
            }}
          >
            <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>
              ⏰ Time's Up!
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Challenge failed - time ran out!
            </p>
          </motion.div>
          
          <button onClick={startChallenge} className="primary-button">
            Try Again
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button onClick={resetGame} className="secondary-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default SixSeconds;