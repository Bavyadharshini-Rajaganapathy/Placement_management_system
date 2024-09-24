import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MainSection from './MainSection';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';

const HomePage = () => {
  const [userType, setUserType] = useState(''); // Track the type of user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass userType and isLoggedIn to the Navbar */}
      <Navbar userType={userType} isLoggedIn={isLoggedIn} />

      {/* Define Routes */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<MainSection />} />
        
        {/* Login page - Pass setIsLoggedIn and setUserType as props */}
        <Route 
          path="/login" 
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} 
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
