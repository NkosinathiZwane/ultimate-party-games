// src/games/SixSeconds.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import { gameContent } from '../data/gameContent';

const SixSeconds = () => {
  const [gameState, setGameState] = useState('mode-selection'); // mode-selection, setup, ready, playing, finished
  const [gameMode, setGameMode] = useState('casual'); // casual, couple
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [couples, setCouples] = useState([]);
  const [currentCoupleIndex, setCurrentCoupleIndex] = useState(0);
  const [partner1Input, setPartner1Input] = useState('');
  const [partner2Input, setPartner2Input] = useState('');

  const addCouple = () => {
    if (partner1Input.trim() && partner2Input.trim()) {
      setCouples([...couples, { partner1: partner1Input.trim(), partner2: partner2Input.trim() }]);
      setPartner1Input('');
      setPartner2Input('');
    }
  };

  const removeCouple = (index) => {
    setCouples(couples.filter((_, i) => i !== index));
    if (currentCoupleIndex >= couples.length - 1) {
      setCurrentCoupleIndex(0);
    }
  };

  const startGame = () => {
    if (gameMode === 'couple' && couples.length === 0) return;
    setGameState('ready');
  };

  const startChallenge = () => {
    const challengePool = gameMode === 'couple' 
      ? [...gameContent.six, ...gameContent.sixCouple] 
      : gameContent.six;
    const randomChallenge = challengePool[Math.floor(Math.random() * challengePool.length)];
    
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
    
    // Move to next couple if in couple mode
    if (gameMode === 'couple' && couples.length > 0) {
      setCurrentCoupleIndex((prev) => (prev + 1) % couples.length);
    }
    
    setGameState('ready');
    setCurrentChallenge('');
  };

  const handleFail = () => {
    setStreak(0);
    setTimerActive(false);
    
    // Move to next couple if in couple mode
    if (gameMode === 'couple' && couples.length > 0) {
      setCurrentCoupleIndex((prev) => (prev + 1) % couples.length);
    }
    
    setGameState('ready');
    setCurrentChallenge('');
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTotalChallenges(0);
    setGameState('mode-selection');
    setCurrentChallenge('');
    setTimerActive(false);
    setCouples([]);
    setCurrentCoupleIndex(0);
  };

  const getStreakMessage = () => {
    if (streak >= 10) return "🔥 ON FIRE! 🔥";
    if (streak >= 5) return "🌟 Hot Streak! 🌟";
    if (streak >= 3) return "⚡ Getting Hot! ⚡";
    return "";
  };

  const getCurrentPlayer = () => {
    if (gameMode === 'couple' && couples.length > 0) {
      const currentCouple = couples[currentCoupleIndex];
      return `${currentCouple.partner1} & ${currentCouple.partner2}`;
    }
    return "";
  };

  // Mode Selection Screen
  if (gameState === 'mode-selection') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">⚡ 6 Seconds</h1>
          <p>Choose your game mode!</p>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '3rem 2rem',
              borderRadius: '25px',
              marginBottom: '2rem'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
            <h2 style={{ marginBottom: '2rem', color: '#feca57' }}>Choose Game Mode</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGameMode('casual');
                  setGameState('setup');
                }}
                className="primary-button"
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                😊 Casual Mode
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGameMode('couple');
                  setGameState('setup');
                }}
                className="secondary-button"
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                💕 Couple Mode
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Setup Screen for Couple Mode
  if (gameState === 'setup' && gameMode === 'couple') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">⚡ 6 Seconds - Couple Mode</h1>
          <p>Add couples to play!</p>
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Add Couple:</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Partner 1 name"
                value={partner1Input}
                onChange={(e) => setPartner1Input(e.target.value)}
                className="input-field"
                style={{ width: '100%' }}
              />
              <input
                type="text"
                placeholder="Partner 2 name"
                value={partner2Input}
                onChange={(e) => setPartner2Input(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCouple()}
                className="input-field"
                style={{ width: '100%' }}
              />
              <button onClick={addCouple} className="primary-button">
                Add Couple 💕
              </button>
            </div>
          </div>

          {couples.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ textAlign: 'center' }}>Couples ({couples.length}):</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {couples.map((couple, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{couple.partner1} & {couple.partner2}</span>
                    <button
                      onClick={() => removeCouple(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startGame}
              disabled={couples.length === 0}
              className="primary-button"
              style={{ 
                fontSize: '1.2rem', 
                padding: '1rem 2rem',
                opacity: couples.length === 0 ? 0.5 : 1
              }}
            >
              Start Game! 🎮
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setGameState('mode-selection')} 
              className="secondary-button"
            >
              ← Change Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Setup Screen for Casual Mode
  if (gameState === 'setup' && gameMode === 'casual') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">⚡ 6 Seconds - Casual Mode</h1>
          <p>Lightning fast challenges for everyone!</p>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '3rem 2rem',
              borderRadius: '25px',
              marginBottom: '2rem'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
            <h2 style={{ marginBottom: '1rem', color: '#feca57' }}>Ready to Play!</h2>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
              Get ready for lightning-fast challenges that will test your quick thinking!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="primary-button"
              style={{ fontSize: '1.3rem', padding: '1.2rem 2.5rem' }}
            >
              Start Playing! ⚡
            </motion.button>
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setGameState('mode-selection')} 
              className="secondary-button"
            >
              ← Change Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">⚡ 6 Seconds</h1>
        <p>
          {gameMode === 'casual' 
            ? 'Lightning fast challenges - think quick or fail!' 
            : `Couple Mode - Current: ${getCurrentPlayer()}`
          }
        </p>
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

      {/* Current Player Display for Couple Mode */}
      {gameMode === 'couple' && couples.length > 0 && (
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          padding: '1rem 2rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          maxWidth: '400px',
          margin: '0 auto 2rem'
        }}>
          <h3 style={{ margin: 0, color: 'white' }}>
            💕 Current Couple: {getCurrentPlayer()}
          </h3>
        </div>
      )}

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
            {gameMode === 'couple' && (
              <p style={{ color: '#feca57' }}>
                Work together as a couple to complete the challenge!
              </p>
            )}
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

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Timer
              duration={6}
              onTimeUp={handleTimeUp}
              isActive={timerActive}
              onStop={() => setTimerActive(false)}
            />
          </div>

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
          New Game
        </button>
      </div>
    </div>
  );
};

export default SixSeconds;