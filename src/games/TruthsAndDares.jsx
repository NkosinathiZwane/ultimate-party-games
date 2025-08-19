// src/games/TruthsAndDares.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Wheel from '../components/Wheel';
import PlayerResultModal from '../components/PlayerResultModal';
import QuestionModal from '../components/QuestionModal';
import GameModeModal from '../components/GameModeModal';
import { gameContent } from '../data/gameContent';

const TruthsAndDares = () => {
  const [gameState, setGameState] = useState('mode-selection'); // mode-selection, setup, playing
  const [players, setPlayers] = useState([]);
  const [gameMode, setGameMode] = useState('casual'); // casual, couple
  const [inputMethod, setInputMethod] = useState('names'); // names, numbers
  const [playerCount, setPlayerCount] = useState(4);
  const [playerInput, setPlayerInput] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [usedQuestions, setUsedQuestions] = useState({ truth: [], dare: [] });

  const handleModeSelection = (mode) => {
    setGameMode(mode);
    setGameState('setup');
  };

  const addPlayer = () => {
    if (playerInput.trim() && !players.includes(playerInput.trim()) && players.length < 50) {
      setPlayers([...players, playerInput.trim()]);
      setPlayerInput('');
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const generateNumberedPlayers = () => {
    const numberedPlayers = [];
    for (let i = 1; i <= playerCount; i++) {
      numberedPlayers.push(`Player ${i}`);
    }
    setPlayers(numberedPlayers);
  };

  const startGame = () => {
    if (inputMethod === 'numbers') {
      generateNumberedPlayers();
    }
    if (players.length >= 2 || inputMethod === 'numbers') {
      setGameState('playing');
    }
  };

  const handlePlayerSelected = (player) => {
    setCurrentPlayer(player);
    setShowPlayerModal(true);
  };

  const getRandomQuestion = (type) => {
    // Add safety check for gameContent
    if (!gameContent?.truthsAndDares?.[gameMode]?.[type]) {
      console.warn(`No ${type} questions found for ${gameMode} mode`);
      return `Sample ${type} question - please check your gameContent.js file`;
    }

    const questions = gameContent.truthsAndDares[gameMode][type];
    const availableQuestions = questions.filter(q => !usedQuestions[type].includes(q));
    
    if (availableQuestions.length === 0) {
      // Reset used questions if we've gone through all
      setUsedQuestions(prev => ({ ...prev, [type]: [] }));
      return questions[Math.floor(Math.random() * questions.length)];
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  };

  const handleChooseAction = (type) => {
    const randomQuestion = getRandomQuestion(type);
    
    setCurrentQuestion(randomQuestion);
    setCurrentType(type);
    setUsedQuestions(prev => ({
      ...prev,
      [type]: [...prev[type], randomQuestion]
    }));
    setShowPlayerModal(false);
    setShowQuestionModal(true);
  };

  const handleNextRound = () => {
    setShowQuestionModal(false);
    setCurrentPlayer(null);
    setCurrentQuestion('');
    setCurrentType('');
  };

  const handleEndGame = () => {
    setGameState('mode-selection');
    setPlayers([]);
    setCurrentPlayer(null);
    setShowQuestionModal(false);
    setShowPlayerModal(false);
    setUsedQuestions({ truth: [], dare: [] });
  };

  const backToModeSelection = () => {
    setGameState('mode-selection');
    setPlayers([]);
    setUsedQuestions({ truth: [], dare: [] });
  };

  if (gameState === 'mode-selection') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">🎭 Truths & Dares</h1>
          <p>Choose your game mode to get started!</p>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎭</div>
            <h2 style={{ marginBottom: '2rem', color: '#feca57' }}>
              Choose Your Adventure
            </h2>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModeSelection('casual')}
                className="primary-button"
                style={{ minWidth: '180px', padding: '1.2rem 2rem' }}
              >
                😊 Casual Mode
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModeSelection('couple')}
                className="secondary-button"
                style={{ minWidth: '180px', padding: '1.2rem 2rem' }}
              >
                💕 Couple Mode
              </motion.button>
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              fontSize: '0.9rem', 
              opacity: 0.8,
              lineHeight: '1.5'
            }}>
              <p><strong>Casual Mode:</strong> Fun questions for friends and groups</p>
              <p><strong>Couple Mode:</strong> Intimate questions for couples and romantic partners</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">🎭 Truths & Dares</h1>
          <p>Mode: {gameMode === 'casual' ? 'Casual 😊' : 'Couple 💕'}</p>
          <button 
            onClick={backToModeSelection}
            className="secondary-button"
            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            Change Mode
          </button>
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Input Method Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Player Setup:</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <button
                onClick={() => setInputMethod('names')}
                className={inputMethod === 'names' ? 'primary-button' : 'secondary-button'}
              >
                Enter Names
              </button>
              <button
                onClick={() => setInputMethod('numbers')}
                className={inputMethod === 'numbers' ? 'primary-button' : 'secondary-button'}
              >
                Use Numbers
              </button>
            </div>

            {inputMethod === 'names' ? (
              <div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Enter player name"
                    value={playerInput}
                    onChange={(e) => setPlayerInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                    className="input-field"
                    maxLength={20}
                  />
                  <button onClick={addPlayer} className="primary-button">Add</button>
                </div>
                
                {players.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4>Players ({players.length}/50):</h4>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem', 
                      justifyContent: 'center', 
                      marginTop: '0.5rem',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      padding: '0.5rem'
                    }}>
                      {players.map((player, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          {player}
                          <button
                            onClick={() => removePlayer(index)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ff6b6b',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '1rem'
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {players.length >= 50 && (
                  <p style={{ color: '#feca57', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Maximum of 50 players reached!
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Number of Players: {playerCount}
                </label>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.8rem', 
                  opacity: 0.7 
                }}>
                  <span>2 players</span>
                  <span>50 players</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={startGame}
            disabled={
              (inputMethod === 'names' && players.length < 2) ||
              (inputMethod === 'names' && players.length === 0)
            }
            className="primary-button"
            style={{ 
              fontSize: '1.2rem', 
              padding: '1rem 2rem',
              opacity: (
                (inputMethod === 'names' && players.length < 2) ||
                (inputMethod === 'names' && players.length === 0)
              ) ? 0.5 : 1
            }}
          >
            Start Game! 🎮
          </button>

          {inputMethod === 'names' && players.length < 2 && (
            <p style={{ 
              color: '#ff6b6b', 
              fontSize: '0.9rem', 
              marginTop: '1rem',
              opacity: 0.8
            }}>
              Add at least 2 players to start the game
            </p>
          )}

          <div style={{
            marginTop: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '15px',
            fontSize: '0.9rem'
          }}>
            <p><strong>Game Mode: {gameMode === 'casual' ? 'Casual 😊' : 'Couple 💕'}</strong></p>
            {gameContent?.truthsAndDares?.[gameMode] ? (
              <>
                <p>Truths: {gameContent.truthsAndDares[gameMode].truth?.length || 0}</p>
                <p>Dares: {gameContent.truthsAndDares[gameMode].dare?.length || 0}</p>
              </>
            ) : (
              <p>Loading game content...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">🎭 Truths & Dares</h1>
        <p>Mode: {gameMode === 'casual' ? 'Casual 😊' : 'Couple 💕'} | Players: {players.length}</p>
      </div>

      <Wheel players={players} onPlayerSelected={handlePlayerSelected} />

      {/* Stats Display */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '15px',
        marginTop: '2rem',
        maxWidth: '400px',
        margin: '2rem auto'
      }}>
        <p><strong>Questions Used:</strong></p>
        {gameContent?.truthsAndDares?.[gameMode] ? (
          <>
            <p>Truths: {usedQuestions.truth.length} / {gameContent.truthsAndDares[gameMode].truth?.length || 0}</p>
            <p>Dares: {usedQuestions.dare.length} / {gameContent.truthsAndDares[gameMode].dare?.length || 0}</p>
          </>
        ) : (
          <p>Loading game statistics...</p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={handleEndGame} className="secondary-button">
          New Game
        </button>
      </div>

      <PlayerResultModal
        player={currentPlayer}
        onChooseAction={handleChooseAction}
      />

      <QuestionModal
        type={currentType}
        question={currentQuestion}
        player={currentPlayer}
        onNext={handleNextRound}
        onClose={handleEndGame}
      />
    </div>
  );
};

export default TruthsAndDares;