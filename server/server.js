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
  password: 'Bavya_21',  // your MySQL password
  database: 'sample',    // your database name
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

// Get all hiring companies with associated job roles
app.get('/api/companies', (req, res) => {
  const sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN job_roles jr ON cd.id = jr.company_id
    WHERE cd.ishiring = 1
    GROUP BY cd.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching companies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Get hiring companies filtered by job role
app.get('/api/companies/role/:role', (req, res) => {
  const role = req.params.role;
  const sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN job_roles jr ON cd.id = jr.company_id
    WHERE cd.ishiring = 1 AND jr.role = ?
    GROUP BY cd.id`;

  db.query(sql, [role], (err, results) => {
    if (err) {
      console.error('Error fetching companies by role:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Get all top companies (where istop = 1)
app.get('/api/companies/top', (req, res) => {
  const sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN job_roles jr ON cd.id = jr.company_id
    WHERE cd.istop = 1
    GROUP BY cd.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching top companies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/apply', (req, res) => {
  const { usn, company_id, job_role, resume_link, cover_letter } = req.body;

  const sql = `INSERT INTO applications (usn, company_id, job_role, resume_link, cover_letter)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [usn, company_id, job_role, resume_link, cover_letter], (err, result) => {
    if (err) {
      console.error('Error inserting application:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json({ message: 'Application submitted successfully' });
  });
});

// Get user details by usn
app.get('/api/user/:usn', (req, res) => {
  const { usn } = req.params;
  const sql = `SELECT * FROM studentdetails WHERE usn = ?`;

  db.query(sql, [usn], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});

// Update user details
app.put('/api/user/:usn', (req, res) => {
  const { usn } = req.params;
  const { name, email, phone, address } = req.body; // Editable fields

  const sql = `UPDATE studentdetails SET name = ?, email = ?, phone = ?, address = ? WHERE usn = ?`;
  db.query(sql, [name, email, phone, address, usn], (err) => {
    if (err) {
      console.error('Error updating user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Details updated successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
