import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import Explore from './components/Explore/Explore';
import TopCompanies from './components/TopCompanies/TopCompanies';
import ViewDetails from './components/ViewDetails/ViewDetails';  // Import the ViewDetails component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} userType={userType} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/top-companies" element={<TopCompanies />} />
        <Route path="/view-details/:companyId" element={<ViewDetails />} />  {/* Add the ViewDetails route */}
      </Routes>
    </Router>
  );
};

export default App;
