// src/games/ThirtyOneSeconds.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import { gameContent } from '../data/gameContent';

const ThirtyOneSeconds = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, finished
  const [teams, setTeams] = useState([{ name: 'Team A', score: 0 }, { name: 'Team B', score: 0 }]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

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
  };

  const handleTimeUp = () => {
    setTimerActive(false);
    // Auto move to next team after 3 seconds
    setTimeout(() => {
      nextTeam();
    }, 3000);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const addPoint = () => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeam].score += 1;
    setTeams(updatedTeams);
  };

  const nextTeam = () => {
    setGameState('setup');
    setCurrentCategory(null);
    setTimerActive(false);
    
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
  };

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">⏱️ 31 Seconds</h1>
        <p>Describe 8 items from the category in 31 seconds!</p>
      </div>

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
              Describe these 8 items to your team:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {currentCategory.items.map((item, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.9rem'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <Timer
            duration={31}
            onTimeUp={handleTimeUp}
            isActive={timerActive}
            onStop={stopTimer}
          />

          {!timerActive && (
            <div style={{ marginTop: '2rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                How many items did {teams[currentTeam].name} get correct?
              </p>
              <button onClick={addPoint} className="primary-button">
                +1 Point
              </button>
              <button onClick={nextTeam} className="secondary-button">
                Next Team
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