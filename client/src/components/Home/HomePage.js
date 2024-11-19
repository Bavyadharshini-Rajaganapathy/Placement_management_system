import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MainSection from './MainSection';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import TopCompanies from '../TopCompanies/TopCompanies';
import Explore from '../Explore/Explore';


const HomePage = ({ userType, isLoggedIn }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass userType and isLoggedIn to the Navbar */}
      <Navbar userType={userType} isLoggedIn={isLoggedIn} />

      {/* Define Routes */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<MainSection />} />
        
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/top-companies" element={isLoggedIn ? <TopCompanies /> : <MainSection />} />
        <Route path="/explore" element={isLoggedIn ? <Explore /> : <MainSection />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
