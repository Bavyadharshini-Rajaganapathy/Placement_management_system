const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // your MySQL username
  password: 'Bavya_21', // your MySQL password
  database: 'sample',     // your database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Login API endpoint
app.post('/api/login', (req, res) => {
  const { email, password, loginType } = req.body;

  if (!email || !password || !loginType) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  let query;
  if (loginType === 'student') {
    query = 'SELECT * FROM slogin WHERE email = ?';
  } else if (loginType === 'staff') {
    query = 'SELECT * FROM alogin WHERE email = ?';
  } else {
    return res.status(400).json({ success: false, message: 'Invalid login type' });
  }

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Login successful
    return res.status(200).json({ success: true, message: 'Login successful' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
