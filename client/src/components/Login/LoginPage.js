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
    <div className="login-page">
      <h1>Login</h1>
      <select value={loginType} onChange={(e) => setLoginType(e.target.value)}>
        <option value="">Select Login Type</option>
        <option value="Student">Student</option>
        <option value="Staff">Staff</option>
      </select>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
