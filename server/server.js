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

// Registration API endpoint
app.post('/api/register', (req, res) => {
  const { username: usn, fullName: name, email, password } = req.body;

  // Check if all fields are provided
  if (!usn || !name || !email || !password) {
    console.log("Missing fields:", { usn, name, email, password });
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if the username (USN) already exists in the studentdetails table
  const checkUserQuery = 'SELECT * FROM studentdetails WHERE usn = ?';
  db.query(checkUserQuery, [usn], (err, results) => {
    if (err) {
      console.error('Database error while checking USN existence:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      // If the USN already exists
      console.log("USN already exists:", usn);
      return res.status(409).json({ success: false, message: 'Username (USN) already exists' });
    }

    // Insert into studentdetails table
    const studentDetailsQuery = 'INSERT INTO studentdetails (usn, name, email) VALUES (?, ?, ?)';
    db.query(studentDetailsQuery, [usn, name, email], (err, result) => {
      if (err) {
        console.error('Error inserting into studentdetails:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      console.log('Inserted into studentdetails:', result);

      // Insert into slogin table for login credentials
      const loginQuery = 'INSERT INTO slogin (usn, email, password) VALUES (?, ?, ?)';
      db.query(loginQuery, [usn, email, password], (err, result) => {
        if (err) {
          console.error('Error inserting into slogin:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        console.log('Inserted into slogin:', result);

        // Registration successful
        res.status(200).json({ success: true, message: 'Registration successful' });
      });
    });
  });
});

// Get all hiring companies with associated job roles and optional sorting
app.get('/api/companies', (req, res) => {
  const { role } = req.query;

  let sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN jobroles jr ON cd.id = jr.company_id
    WHERE cd.ishiring = 1`;

  // If a role filter is specified, add a HAVING clause
  if (role) {
    sql += ` AND jr.role LIKE ?`;
  }

  sql += ` GROUP BY cd.id`;

  db.query(sql, role ? [`%${role}%`] : [], (err, results) => {
    if (err) {
      console.error('Error fetching companies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
