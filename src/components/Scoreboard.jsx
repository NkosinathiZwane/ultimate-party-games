// src/components/Scoreboard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Scoreboard = ({ teams, currentTeam }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      flexWrap: 'wrap',
      gap: '1rem',
      margin: '2rem 0'
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
          <h3>{team.name}</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {team.score}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Scoreboard;