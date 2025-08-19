// src/components/Wheel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Wheel = ({ players, onPlayerSelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [rotation, setRotation] = useState(0);

  // Colors for the wheel segments
  const colors = [
    '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', 
    '#5f27cd', '#00d2d3', '#ff9f43', '#ee5a24', '#0abde3',
    '#10ac84', '#f368e0', '#3742fa', '#2f3542', '#57606f',
    '#2ed573', '#ffa502', '#ff3838', '#1e90ff', '#ff1744'
  ];

  const spinWheel = () => {
    if (isSpinning || players.length === 0) return;
    
    setIsSpinning(true);
    setSelectedPlayer(null);
    
    // Calculate random rotation (multiple full rotations + random angle)
    const randomRotation = 360 * 5 + Math.random() * 360; // 5 full rotations + random
    const finalRotation = rotation + randomRotation;
    setRotation(finalRotation);
    
    // Calculate which segment the pointer lands on
    setTimeout(() => {
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const segmentAngle = 360 / players.length;
      const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
      const chosen = players[selectedIndex];
      
      setSelectedPlayer(chosen);
      setIsSpinning(false);
      onPlayerSelected(chosen);
    }, 4000); // 4 second spin duration
  };

  const segmentAngle = 360 / players.length;

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Wheel Container */}
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}
          onClick={spinWheel}
          animate={{ rotate: rotation }}
          transition={isSpinning ? { 
            duration: 4, 
            ease: [0.17, 0.67, 0.12, 0.99] // Custom easing for realistic spin
          } : { duration: 0 }}
        >
          {/* Wheel segments */}
          {players.map((player, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            const x1 = 150 + 140 * Math.cos(startAngleRad);
            const y1 = 150 + 140 * Math.sin(startAngleRad);
            const x2 = 150 + 140 * Math.cos(endAngleRad);
            const y2 = 150 + 140 * Math.sin(endAngleRad);
            
            const largeArcFlag = segmentAngle > 180 ? 1 : 0;
            
            const pathData = [
              'M', 150, 150,
              'L', x1, y1,
              'A', 140, 140, 0, largeArcFlag, 1, x2, y2,
              'Z'
            ].join(' ');

            // Text position
            const textAngle = startAngle + segmentAngle / 2;
            const textAngleRad = (textAngle * Math.PI) / 180;
            const textX = 150 + 90 * Math.cos(textAngleRad);
            const textY = 150 + 90 * Math.sin(textAngleRad);
            
            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    userSelect: 'none'
                  }}
                >
                  {player.length > 8 ? player.substring(0, 8) + '...' : player}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle
            cx="150"
            cy="150"
            r="25"
            fill="#2c3e50"
            stroke="#fff"
            strokeWidth="3"
          />
          <text
            x="150"
            y="150"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ userSelect: 'none' }}
          >
            SPIN
          </text>
        </motion.svg>
        
        {/* Pointer */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '30px solid #e74c3c',
          zIndex: 10,
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
        }} />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={spinWheel}
          disabled={isSpinning || players.length === 0}
          className={isSpinning ? 'secondary-button' : 'primary-button'}
          style={{ 
            opacity: (isSpinning || players.length === 0) ? 0.7 : 1,
            fontSize: '1.2rem',
            padding: '1rem 2rem'
          }}
        >
          {isSpinning ? '🌀 Spinning...' : '🎯 Spin the Wheel!'}
        </button>
      </div>
      
      {selectedPlayer && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: '2rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#feca57',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 2rem',
            borderRadius: '25px',
            display: 'inline-block'
          }}
        >
          🎉 Selected: {selectedPlayer}! 🎉
        </motion.div>
      )}
    </div>
  );
};

export default Wheel;