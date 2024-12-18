import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import Explore from './components/Explore/Explore';
import TopCompanies from './components/TopCompanies/TopCompanies';
import ViewDetails from './components/ViewDetails/ViewDetails';  
import AboutUs from './components/AboutUs/AboutUs';
import ProfilePage from './components/Profile/Profile';
import EditCompany from './components/EditCompany/EditCompany';
import AddCompanies from './components/AddCompany/AddCompanies'; 

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
        <Route path="/view-details/:companyId" element={<ViewDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<ProfilePage userType={userType}/>} />
        <Route path="/edit-company/:companyId" element={<EditCompany />} />
        <Route path="/add-company" element={<AddCompanies />} /> {/* Add route for AddCompanies */}
      </Routes>
    </Router>
  );
};

export default App;
