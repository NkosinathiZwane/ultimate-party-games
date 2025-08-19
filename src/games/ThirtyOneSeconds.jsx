// src/games/ThirtyOneSeconds.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gameContent } from '../data/gameContent';

const ThirtyOneSeconds = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, scoring
  const [teams, setTeams] = useState([{ name: 'Team A', score: 0 }, { name: 'Team B', score: 0 }]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(31);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);
  const [showScoring, setShowScoring] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!timerActive) return;

    if (timeLeft === 0) {
      setTimerActive(false);
      setShowScoring(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const addTeam = () => {
    const newTeamName = `Team ${String.fromCharCode(65 + teams.length)}`;
    setTeams([...teams, { name: newTeamName, score: 0 }]);
  };

  const removeTeam = (index) => {
    if (teams.length > 2) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const updateTeamName = (index, newName) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = newName;
    setTeams(updatedTeams);
  };

  const startRound = () => {
    const randomCategory = gameContent.thirtyOne[Math.floor(Math.random() * gameContent.thirtyOne.length)];
    setCurrentCategory(randomCategory);
    setGameState('playing');
    setTimerActive(true);
    setTimeLeft(31);
    setCompletedItems([]);
    setShowScoring(false);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setShowScoring(true);
  };

  const toggleItemCompletion = (itemIndex) => {
    if (completedItems.includes(itemIndex)) {
      setCompletedItems(completedItems.filter(index => index !== itemIndex));
    } else {
      setCompletedItems([...completedItems, itemIndex]);
    }
  };

  const confirmScore = () => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeam].score += completedItems.length;
    setTeams(updatedTeams);
    nextTeam();
  };

  const nextTeam = () => {
    setGameState('setup');
    setCurrentCategory(null);
    setTimerActive(false);
    setShowScoring(false);
    setCompletedItems([]);
    setTimeLeft(31);
    
    const nextTeamIndex = (currentTeam + 1) % teams.length;
    setCurrentTeam(nextTeamIndex);
    
    if (nextTeamIndex === 0) {
      setRoundsPlayed(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })));
    setCurrentTeam(0);
    setRoundsPlayed(0);
    setGameState('setup');
    setCurrentCategory(null);
    setTimerActive(false);
    setShowScoring(false);
    setCompletedItems([]);
    setTimeLeft(31);
  };

  const TimerDisplay = () => {
    const percentage = (timeLeft / 31) * 100;
    const isWarning = timeLeft <= 10;

    return (
      <div className="timer-right">
        <motion.div
          animate={isWarning ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: isWarning ? Infinity : 0 }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `conic-gradient(${isWarning ? '#ff6b6b' : '#48dbfb'} ${percentage * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: isWarning ? '#ff6b6b' : '#48dbfb',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {timeLeft}
        </motion.div>
        
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
          {timerActive && (
            <button 
              onClick={stopTimer} 
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '0.3rem 0.8rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Stop
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">⏱️ 31 Seconds</h1>
        <p>Describe 8 items from the category in 31 seconds!</p>
      </div>

      {gameState === 'playing' && <TimerDisplay />}

      {/* Scoreboard */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {teams.map((team, index) => (
          <motion.div
            key={index}
            animate={currentTeam === index ? { scale: 1.05 } : { scale: 1 }}
            style={{
              background: currentTeam === index 
                ? 'linear-gradient(45deg, #ff6b6b, #feca57)' 
                : 'rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              borderRadius: '15px',
              textAlign: 'center',
              minWidth: '120px',
              border: currentTeam === index ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {gameState === 'setup' ? (
              <input
                type="text"
                value={team.name}
                onChange={(e) => updateTeamName(index, e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              />
            ) : (
              <h3>{team.name}</h3>
            )}
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {team.score}
            </div>
          </motion.div>
        ))}
      </div>

      {gameState === 'setup' && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={addTeam} className="secondary-button">
              Add Team
            </button>
            {teams.length > 2 && (
              <button 
                onClick={() => removeTeam(teams.length - 1)} 
                className="secondary-button"
                style={{ marginLeft: '0.5rem' }}
              >
                Remove Team
              </button>
            )}
          </div>
          
          <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
            Current turn: <strong>{teams[currentTeam].name}</strong>
          </p>
          
          <button onClick={startRound} className="primary-button">
            Start Round! 🎯
          </button>
        </div>
      )}

      {gameState === 'playing' && currentCategory && (
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
            <h2 style={{ marginBottom: '1rem', color: '#feca57' }}>
              Category: {currentCategory.category}
            </h2>
            <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
              Click items as {teams[currentTeam].name} describes them correctly:
            </p>

            <div className="category-items">
              {currentCategory.items.map((item, index) => (
                <button
                  key={index}
                  className={`category-item ${completedItems.includes(index) ? 'completed' : ''}`}
                  onClick={() => toggleItemCompletion(index)}
                  disabled={timerActive && timeLeft > 0}
                >
                  {item}
                </button>
              ))}
            </div>

            {!timerActive && timeLeft > 0 && !showScoring && (
              <p style={{ 
                marginTop: '1rem', 
                color: '#feca57',
                fontWeight: 'bold'
              }}>
                Timer stopped! Click items that were described correctly.
              </p>
            )}

            {timeLeft === 0 && (
              <p style={{ 
                marginTop: '1rem', 
                color: '#ff6b6b',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                ⏰ Time's Up! Click items that were described correctly.
              </p>
            )}
          </motion.div>

          {showScoring && (
            <div style={{ marginTop: '2rem' }}>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                {teams[currentTeam].name} got <strong>{completedItems.length}</strong> out of 8 items correct!
              </p>
              <button onClick={confirmScore} className="primary-button">
                Confirm Score & Continue
              </button>
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ opacity: 0.7, marginBottom: '1rem' }}>
          Rounds played: {roundsPlayed}
        </p>
        <button onClick={resetGame} className="secondary-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default ThirtyOneSeconds;