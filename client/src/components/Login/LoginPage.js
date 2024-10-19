// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

const LoginPage = ({ setUserType, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginType === 'student' || loginType === 'staff') {
      try {
        // API call to the backend to authenticate the user
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
          loginType,
        });

        // Handle successful login
        if (response.data.success) {
          setUserType(loginType); // Update user type in the app state
          setIsLoggedIn(true);    // Set the user as logged in
          navigate('/');          // Navigate to home page
        } else {
          alert('Invalid credentials, please try again');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please select either Student or Staff');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-end bg-cover bg-center" style={{ backgroundImage: 'url(/images/image7.png)' }}>
      <div className="p-19 w-full max-w-xl ml-auto mr-20 mb-10">
        <h1 className="text-6xl mb-6 text-white justify-end">Welcome</h1>
        <p className="text-lg mb-8 text-white ml-20">User/Admin Login</p>

        <div className="space-y-7">
          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-4 bg-transparent border text-lg border-white rounded-xl text-white placeholder-white"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-4 bg-transparent border border-white rounded-xl text-lg text-white placeholder-white"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Login Type</label>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="w-full px-4 py-4 bg-transparent border border-white rounded-xl text-lg text-white"
            >
              <option value="" disabled hidden>Select Login Type</option>
              <option value="student" className="text-black">User</option>
              <option value="staff" className="text-black">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleLogin}
            className="w-1/3 bg-white mr-4 text-black py-3 rounded-lg text-xl font-semibold"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
