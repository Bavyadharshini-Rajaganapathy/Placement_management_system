import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
        fullName,
      });

      if (response.data.success) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Set error message if username already exists
        setErrorMessage('Username already exists. Please choose another.');
      } else {
        console.error('Registration error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-end bg-cover bg-center" style={{ backgroundImage: 'url(/images/image7.png)' }}>
      <div className="p-19 w-full max-w-xl ml-auto mr-20 mb-10">
        <h1 className="text-6xl mb-6 text-white justify-end">Welcome</h1>
        <div className="flex justify-center text-3xl font-semibold mb-8 text-white ml-20">
          <Link to="/register" className={`mr-4 ${window.location.pathname === '/register' ? 'underline' : ''}`}>Register</Link>/
          <Link to="/login" className={`ml-4 ${window.location.pathname === '/login' ? 'underline' : ''}`}>Login</Link>
        </div>

        <div className="space-y-7">
          {/* Username Input */}
          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(''); // Clear error message when typing
              }}
              placeholder="Set your username"
              className="w-full px-4 py-4 bg-transparent border text-lg border-white rounded-xl text-white placeholder-white"
            />
            {errorMessage && (
              <p className="text-red-500 mt-1 text-lg ml-8">{errorMessage}</p>
            )}
          </div>

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
              placeholder="Set your password"
              className="w-full px-4 py-4 bg-transparent border border-white rounded-xl text-lg text-white placeholder-white"
            />
          </div>

          {/* Full Name Input */}
          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your Full Name"
              className="w-full px-4 py-4 bg-transparent border text-lg border-white rounded-xl text-white placeholder-white"
            />
          </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleRegister}
            className="w-1/3 bg-white mr-4 text-black py-3 rounded-lg text-xl font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
