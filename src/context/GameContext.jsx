// src/context/GameContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  currentGame: null,
  players: [],
  usedPlayers: [],
  teams: [],
  scores: {},
  gameMode: 'casual',
  inputMethod: 'names',
  roundsCompleted: 0
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
      return { ...state, currentGame: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'ADD_PLAYER':
      return { ...state, players: [...state.players, action.payload] };
    case 'REMOVE_PLAYER':
      return { 
        ...state, 
        players: state.players.filter((_, index) => index !== action.payload) 
      };
    case 'SET_GAME_MODE':
      return { ...state, gameMode: action.payload };
    case 'SET_INPUT_METHOD':
      return { ...state, inputMethod: action.payload };
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'UPDATE_SCORE':
      return {
        ...state,
        scores: { ...state.scores, [action.payload.team]: action.payload.score }
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;