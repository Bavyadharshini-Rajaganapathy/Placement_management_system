import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} userType={userType} />}
        />
        <Route
          path="/login"
          element={
            <LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
