import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MainSection from './MainSection';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import StudentDetails from '../Student/StudentDetails';
import PlacedStudents from '../Placement/PlacedStudents';
import Companies from '../Companies/Companies';

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
        <Route path="/student-details" element={isLoggedIn ? <StudentDetails /> : <MainSection />} />
        <Route path="/placed-students" element={isLoggedIn ? <PlacedStudents /> : <MainSection />} />
        <Route path="/companies" element={isLoggedIn ? <Companies /> : <MainSection />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
