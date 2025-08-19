// src/components/PlayerInput.jsx
import React from 'react';

const PlayerInput = ({ value, onChange, onSubmit, placeholder = "Enter name" }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="input-field"
      />
      <button onClick={onSubmit} className="primary-button">
        Add
      </button>
    </div>
  );
};

export default PlayerInput;