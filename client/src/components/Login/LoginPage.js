// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUserType, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginType === 'student' || loginType === 'staff') {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
          loginType,
        });

        if (response.data.success) {
          setUserType(loginType);
          setIsLoggedIn(true);
          navigate('/');
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
        <div className="flex justify-center text-3xl mb-7 text-white ml-20 font-semibold">
          <Link to="/register" className={`mr-4 ${window.location.pathname === '/register' ? 'underline' : ''}`}>Register</Link>/ 
          <Link to="/login" className={`ml-4 ${window.location.pathname === '/login' ? 'underline' : ''}`}>Login</Link>
        </div>

        <div className="space-y-7">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Login Type Selector */}
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

        {/* Sign In Button */}
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
