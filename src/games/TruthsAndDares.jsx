// src/games/TruthsAndDares.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Wheel from '../components/Wheel';
import PlayerResultModal from '../components/PlayerResultModal';
import QuestionModal from '../components/QuestionModal';
import { gameContent } from '../data/gameContent';

const TruthsAndDares = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing
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

  const addPlayer = () => {
    if (playerInput.trim() && !players.includes(playerInput.trim())) {
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

  const handleChooseAction = (type) => {
    const questions = gameContent.truthsAndDares[gameMode][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    setCurrentQuestion(randomQuestion);
    setCurrentType(type);
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
    setGameState('setup');
    setCurrentPlayer(null);
    setShowQuestionModal(false);
    setShowPlayerModal(false);
  };

  if (gameState === 'setup') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">🎭 Truths & Dares</h1>
          <p>The classic party game that reveals secrets and creates memories!</p>
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Game Mode Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Choose Game Mode:</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setGameMode('casual')}
                className={gameMode === 'casual' ? 'primary-button' : 'secondary-button'}
              >
                Casual Mode 😊
              </button>
              <button
                onClick={() => setGameMode('couple')}
                className={gameMode === 'couple' ? 'primary-button' : 'secondary-button'}
              >
                Couple Mode 💕
              </button>
            </div>
          </div>

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
                  />
                  <button onClick={addPlayer} className="primary-button">Add</button>
                </div>
                
                {players.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4>Players ({players.length}):</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                      {players.map((player, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
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
                              fontWeight: 'bold'
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
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
                  max="20"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
              </div>
            )}
          </div>

          <button
            onClick={startGame}
            disabled={inputMethod === 'names' && players.length < 2}
            className="primary-button"
            style={{ 
              fontSize: '1.2rem', 
              padding: '1rem 2rem',
              opacity: (inputMethod === 'names' && players.length < 2) ? 0.5 : 1
            }}
          >
            Start Game! 🎮
          </button>
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

      <div style={{ marginTop: '2rem' }}>
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