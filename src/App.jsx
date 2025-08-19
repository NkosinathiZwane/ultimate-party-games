import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      // Redirect to a safe page or show appropriate message
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
          {isAgeVerified && (
            <>
              <Route path="/menu" element={<GameMenu onReset={resetAgeVerification} />} />
              <Route path="/truths-and-dares" element={<TruthsAndDares />} />
              <Route path="/31-seconds" element={<ThirtyOneSeconds />} />
              <Route path="/6-seconds" element={<SixSeconds />} />
              <Route path="/do-or-drink" element={<DoOrDrink />} />
              <Route path="/this-or-that" element={<ThisOrThat />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;