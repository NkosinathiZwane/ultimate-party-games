// src/components/GameCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ game, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Link to={game.path} className="game-card">
        <span className="game-card-emoji">{game.emoji}</span>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </Link>
    </motion.div>
  );
};

export default GameCard;