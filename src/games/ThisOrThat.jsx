// src/games/ThisOrThat.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GameModeModal from '../components/GameModeModal';
import { gameContent } from '../data/gameContent';

const ThisOrThat = () => {
  const [gameState, setGameState] = useState('mode-selection'); // mode-selection, playing
  const [gameMode, setGameMode] = useState('casual');
  const [currentOptions, setCurrentOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleModeSelection = (mode) => {
    setGameMode(mode);
    setGameState('playing');
  };

  const getRandomQuestion = () => {
    const questions = gameContent.thisOrThat[gameMode] || gameContent.thisOrThat;
    const availableQuestions = questions.filter(
      question => !usedQuestions.some(used => 
        used[0] === question[0] && used[1] === question[1]
      )
    );
    
    if (availableQuestions.length === 0) {
      // Reset if we've used all questions
      setUsedQuestions([]);
      return questions[Math.floor(Math.random() * questions.length)];
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  };

  const startNewQuestion = () => {
    const question = getRandomQuestion();
    setCurrentOptions(question);
    setUsedQuestions(prev => [...prev, question]);
    setSelectedOption(null);
    setShowResult(false);
    setQuestionCount(prev => prev + 1);
  };

  const handleChoice = (choice, index) => {
    setSelectedOption({ choice, index });
    setShowResult(true);
    
    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      startNewQuestion();
    }, 2000);
  };

  const resetGame = () => {
    setCurrentOptions(null);
    setSelectedOption(null);
    setQuestionCount(0);
    setUsedQuestions([]);
    setShowResult(false);
  };

  const backToModeSelection = () => {
    setGameState('mode-selection');
    resetGame();
  };

  if (gameState === 'mode-selection') {
    return (
      <div className="game-screen">
        <Link to="/menu" className="back-button">← Back to Menu</Link>
        
        <div className="game-header">
          <h1 className="game-title">🤔 This or That</h1>
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤔</div>
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
              <p><strong>Casual Mode:</strong> Fun choices for friends and groups</p>
              <p><strong>Couple Mode:</strong> Intimate choices for couples and romantic partners</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <Link to="/menu" className="back-button">← Back to Menu</Link>
      
      <div className="game-header">
        <h1 className="game-title">🤔 This or That</h1>
        <p>Mode: {gameMode === 'casual' ? 'Casual 😊' : 'Couple 💕'} | Make your choice and spark debates!</p>
        <button 
          onClick={backToModeSelection}
          className="secondary-button"
          style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
        >
          Change Mode
        </button>
      </div>

      {/* Game Stats */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        opacity: 0.8 
      }}>
        {questionCount > 0 && (
          <p>Questions answered: <strong>{questionCount}</strong></p>
        )}
        {usedQuestions.length > 0 && (
          <p>Remaining questions: <strong>{(gameContent.thisOrThat[gameMode] || gameContent.thisOrThat).length - usedQuestions.length}</strong></p>
        )}
      </div>

      {!currentOptions ? (
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
              🤔
            </div>
            <h2 style={{ marginBottom: '1rem', color: '#feca57' }}>
              Ready to Choose?
            </h2>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
              Get ready for some tough decisions and fun debates!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewQuestion}
              className="primary-button"
              style={{ 
                fontSize: '1.3rem', 
                padding: '1.2rem 2.5rem'
              }}
            >
              Start Choosing! 🎯
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
              <li>🎯 Two options will appear</li>
              <li>🤔 Choose the one you prefer</li>
              <li>💬 Discuss your choices with friends</li>
              <li>🔥 Watch the debates get heated!</li>
            </ul>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <div style={{ textAlign: 'center' }}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                marginBottom: '3rem', 
                color: '#feca57',
                fontSize: '2rem'
              }}
            >
              Which would you choose?
            </motion.h2>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'stretch',
              maxWidth: '800px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              {currentOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={!showResult ? { scale: 1.05, y: -5 } : {}}
                  style={{
                    flex: '1',
                    minWidth: '250px',
                    maxWidth: '350px',
                    cursor: showResult ? 'default' : 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => !showResult && handleChoice(option, index)}
                >
                  <div
                    style={{
                      background: selectedOption && selectedOption.index === index
                        ? 'linear-gradient(135deg, #ff6b6b, #feca57)'
                        : showResult && selectedOption && selectedOption.index !== index
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                      padding: '3rem 2rem',
                      borderRadius: '20px',
                      border: selectedOption && selectedOption.index === index
                        ? '3px solid #fff'
                        : '2px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: showResult && selectedOption && selectedOption.index !== index ? 0.3 : 1
                    }}
                  >
                    <div style={{ 
                      fontSize: '3rem', 
                      marginBottom: '1rem',
                      filter: showResult && selectedOption && selectedOption.index !== index ? 'grayscale(1)' : 'none'
                    }}>
                      {option.includes('🍕') && '🍕'}
                      {option.includes('🍔') && '🍔'}
                      {option.includes('🏖️') && '🏖️'}
                      {option.includes('⛰️') && '⛰️'}
                      {option.includes('☀️') && '☀️'}
                      {option.includes('🌙') && '🌙'}
                      {option.includes('⚽') && '⚽'}
                      {option.includes('🏉') && '🏉'}
                      {option.includes('🍖') && '🍖'}
                      {option.includes('🍟') && '🍟'}
                      {option.includes('🐶') && '🐶'}
                      {option.includes('🐱') && '🐱'}
                      {option.includes('🎬') && '🎬'}
                      {option.includes('▶️') && '▶️'}
                      {option.includes('🔥') && '🔥'}
                      {option.includes('❄️') && '❄️'}
                      {option.includes('☕') && '☕'}
                      {option.includes('🫖') && '🫖'}
                      {option.includes('📚') && '📚'}
                      {option.includes('📱') && '📱'}
                      {option.includes('☎️') && '☎️'}
                      {option.includes('🐦') && '🐦'}
                      {option.includes('🦉') && '🦉'}
                      {option.includes('👻') && '👻'}
                      {option.includes('🕊️') && '🕊️'}
                      {option.includes('⏰') && '⏰'}
                      {option.includes('🧠') && '🧠'}
                      {option.includes('🍫') && '🍫'}
                      {option.includes('🍦') && '🍦'}
                      {option.includes('🌧️') && '🌧️'}
                      {option.includes('🏙️') && '🏙️'}
                      {option.includes('🌾') && '🌾'}
                      {option.includes('🏊') && '🏊'}
                      {option.includes('🏃') && '🏃'}
                      {option.includes('🤖') && '🤖'}
                      {option.includes('🎵') && '🎵'}
                      {option.includes('🎶') && '🎶'}
                      {option.includes('📘') && '📘'}
                      {option.includes('📷') && '📷'}
                      {option.includes('🚗') && '🚗'}
                      {option.includes('🚕') && '🚕'}
                      {option.includes('💵') && '💵'}
                      {option.includes('💳') && '💳'}
                      {option.includes('🛒') && '🛒'}
                      {option.includes('🏪') && '🏪'}
                      {option.includes('⛺') && '⛺'}
                      {option.includes('🏨') && '🏨'}
                      {option.includes('💕') && '💕'}
                      {option.includes('💖') && '💖'}
                      {!option.match(/[🍕🍔🏖️⛰️☀️🌙⚽🏉🍖🍟🐶🐱🎬▶️🔥❄️☕🫖📚📱☎️🐦🦉👻🕊️⏰🧠🍫🍦🌧️🏙️🌾🏊🏃🤖🎵🎶📘📷🚗🚕💵💳🛒🏪⛺🏨💕💖]/) && '🎯'}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      margin: 0,
                      color: selectedOption && selectedOption.index === index ? '#fff' : 'inherit'
                    }}>
                      {option.replace(/[🍕🍔🏖️⛰️☀️🌙⚽🏉🍖🍟🐶🐱🎬▶️🔥❄️☕🫖📚📱☎️🐦🦉👻🕊️⏰🧠🍫🍦🌧️🏙️🌾🏊🏃🤖🎵🎶📘📷🚗🚕💵💳🛒🏪⛺🏨💕💖]/g, '').trim()}
                    </h3>

                    {selectedOption && selectedOption.index === index && showResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: '#fff',
                          color: '#ff6b6b',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>

                  {index === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-1rem',
                      transform: 'translateY(-50%)',
                      fontSize: '2rem',
                      color: '#feca57',
                      fontWeight: 'bold',
                      zIndex: 10
                    }}>
                      VS
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {showResult && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  maxWidth: '400px',
                  margin: '2rem auto'
                }}
              >
                <h3 style={{ color: '#feca57', marginBottom: '0.5rem' }}>
                  You chose: {selectedOption.choice}!
                </h3>
                <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
                  Great choice! Next question coming up...
                </p>
                <div style={{ opacity: 0.6 }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    Auto-advancing in 2 seconds...
                  </div>
                </div>
              </motion.div>
            )}

            {!showResult && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ 
                  marginTop: '2rem', 
                  opacity: 0.7,
                  fontSize: '1.1rem'
                }}
              >
                Click on your choice!
              </motion.p>
            )}
          </div>
        </AnimatePresence>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        {currentOptions && (
          <button 
            onClick={startNewQuestion} 
            className="secondary-button"
            style={{ marginRight: '1rem' }}
          >
            Skip Question
          </button>
        )}
        <button onClick={resetGame} className="secondary-button">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default ThisOrThat;