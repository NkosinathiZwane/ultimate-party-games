import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GameMenu from './components/GameMenu';
import TruthsAndDares from './games/TruthsAndDares';
import ThirtyOneSeconds from './games/ThirtyOneSeconds';
import SixSeconds from './games/SixSeconds';
import DoOrDrink from './games/DoOrDrink';
import ThisOrThat from './games/ThisOrThat';
import AgeVerificationModal from './components/AgeVerificationModal';
import './App.css';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const handleEnterGameZone = () => {
    setShowAgeModal(true);
  };

  const handleAgeVerification = (isAdult) => {
    if (isAdult) {
      setIsAgeVerified(true);
      setShowAgeModal(false);
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  const resetAgeVerification = () => {
    setIsAgeVerified(false);
    setShowAgeModal(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <LandingPage 
                  onEnterGameZone={handleEnterGameZone}
                  onReset={resetAgeVerification}
                />
                {showAgeModal && (
                  <AgeVerificationModal onVerify={handleAgeVerification} />
                )}
              </>
            } 
          />

          <Route 
            path="/menu" 
            element={
              isAgeVerified ? (
                <GameMenu onReset={resetAgeVerification} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/truths-and-dares" 
            element={isAgeVerified ? <TruthsAndDares /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/31-seconds" 
            element={isAgeVerified ? <ThirtyOneSeconds /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/6-seconds" 
            element={isAgeVerified ? <SixSeconds /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/do-or-drink" 
            element={isAgeVerified ? <DoOrDrink /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/this-or-that" 
            element={isAgeVerified ? <ThisOrThat /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
