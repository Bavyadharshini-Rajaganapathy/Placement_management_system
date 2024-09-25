import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserType, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginType === 'student' || loginType === 'staff') {
      setUserType(loginType); // Set user type as either 'student' or 'staff'
      setIsLoggedIn(true); // Set login status to true
      navigate('/'); // Navigate back to the home page
    } else {
      alert('Please select either Student or Staff');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-end bg-cover bg-center" style={{ backgroundImage: 'url(/images/image7.png)' }}>
      <div className="p-19 w-full max-w-xl ml-auto mr-20 mb-10">
        <h1 className="text-6xl mb-6 text-white justify-end">Welcome</h1>
        <p className="text-lg mb-8 text-white ml-20">Student/Staff Login</p>
        
        <div className="space-y-7">
          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-4 bg-transparent border text-lg border-white rounded-xl text-white placeholder-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition duration-300"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-4 bg-transparent border border-white rounded-xl text-lg text-white placeholder-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition duration-300"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-2 text-xl font-semibold ml-8">Login Type</label>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="w-full px-4 py-4 bg-transparent border border-white rounded-xl text-lg text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition duration-300"
            >
              <option value="" disabled hidden className="text-white">Select Login Type</option>
              <option value="student" className="text-black">Student</option>
              <option value="staff" className="text-black">Staff</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleLogin}
            className="w-1/3 bg-white mr-4 text-black py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 hover:text-white transition duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
