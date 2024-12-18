import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';

const Navbar = ({ userType, isLoggedIn, userId }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLoginAlert = () => {
    if (!isLoggedIn) {
      alert("Please log in to access this feature.");
    }
  };

  const toggleProfilePopup = () => {
    setShowProfile((prev) => !prev);
  };

  const renderLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <button onClick={handleLoginAlert} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Top Companies</button>
          <button onClick={handleLoginAlert} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Explore</button>
          <button onClick={() => navigate('/about-us')} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">About Us</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => navigate('/top-companies')} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Top Companies</button>
          <button onClick={() => navigate('/explore')} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Explore</button>
          <button onClick={() => navigate('/about-us')} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">About Us</button>
        </>
      );
    }
  };

  return (
    <nav className="absolute top-0 w-full text-white h-[10vh] flex justify-end items-center px-6 bg-transparent z-10 font-Carrois">
      <div className="flex items-center space-x-8 md:space-x-16 lg:space-x-28">
        {renderLinks()}
        {!isLoggedIn ? (
          <button onClick={handleLoginClick} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Register/Login</button>
        ) : (
          <button onClick={toggleProfilePopup} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">
            {userType === 'student' ? 'Your Profile' : 'Admin Profile'}
          </button>
        )}
      </div>

      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <Profile
            userType={userType}
            userId={userId}
            onClose={toggleProfilePopup}  // Pass function to close the popup
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
