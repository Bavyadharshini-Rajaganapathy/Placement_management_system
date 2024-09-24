import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userType, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to the login page instead of setting the login state directly
    navigate('/login');
  };

  const handleLoginAlert = () => {
    if (!isLoggedIn) {
      alert("Please log in to access this feature.");
    }
  };

  const renderLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <button onClick={handleLoginAlert} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Student Details</button>
          <button onClick={handleLoginAlert} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Placed Students</button>
          <button onClick={handleLoginAlert} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Companies</button>
        </>
      );
    } else {
      return (
        <>
          <button className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Student Details</button>
          <button className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Placed Students</button>
          <button className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Companies</button>
        </>
      );
    }
  };

  return (
    <nav className="absolute top-0 w-full text-white h-[10vh] flex justify-end items-center px-6 bg-transparent z-10 font-Carrois">
      <div className="flex items-center space-x-8 md:space-x-16 lg:space-x-28">
        {renderLinks()}
        {!isLoggedIn ? (
          <button onClick={handleLoginClick} className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">Sign in</button>
        ) : (
          <button className="hover:text-gray-200 text-xl md:text-1xl lg:text-2xl">
            {userType === 'student' ? 'Student' : 'Staff'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
