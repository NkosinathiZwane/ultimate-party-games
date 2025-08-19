// src/components/GameMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GameCard from './GameCard';

const GameMenu = () => {
  const games = [
    {
      id: 'truths-and-dares',
      title: 'Truths & Dares',
      emoji: '🎭',
      description: 'Classic party game with spicy questions and wild challenges',
      path: '/truths-and-dares'
    },
    {
      id: '31-seconds',
      title: '31 Seconds',
      emoji: '⏱️',
      description: 'Fast-paced team game - describe 8 items in 31 seconds',
      path: '/31-seconds'
    },
    {
      id: '6-seconds',
      title: '6 Seconds',
      emoji: '⚡',
      description: 'Lightning quick challenges - think fast or lose!',
      path: '/6-seconds'
    },
    {
      id: 'do-or-drink',
      title: 'Do or Drink',
      emoji: '🍹',
      description: 'Dare-based drinking game for the brave',
      path: '/do-or-drink'
    },
    {
      id: 'this-or-that',
      title: 'This or That',
      emoji: '🤔',
      description: 'Would you rather style choices - spark debates!',
      path: '/this-or-that'
    }
  ];

  return (
    <div className="game-menu">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="back-button"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 10
        }}
      >
        🏠 Home
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ultimate Party Games
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ 
          fontSize: '1.1rem', 
          marginBottom: '3rem', 
          opacity: 0.8 
        }}
      >
        Choose your adventure - which game will make your night unforgettable?
      </motion.p>
      
      <div className="game-cards">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </div>
  );
};

export default GameMenu;