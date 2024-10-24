import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import Explore from './components/Explore/Explore';
import TopCompanies from './components/TopCompanies/TopCompanies';

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
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />}
        />
        <Route
          path="/explore"
          element={<Explore />}
        />
        <Route
          path="/top-companies"
          element={<TopCompanies />}
        />
      </Routes>
    </Router>
  );
};

export default App;
