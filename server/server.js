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

// Get details of a specific company by ID
app.get('/api/companies/:companyId', (req, res) => {
  const { companyId } = req.params;

  const sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN job_roles jr ON cd.id = jr.company_id
    WHERE cd.id = ?
    GROUP BY cd.id`;

  db.query(sql, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching company details:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Get details of a specific company by ID
app.get('/api/companies/:companyId', (req, res) => {
  const { companyId } = req.params;

  const sql = `
    SELECT cd.*, GROUP_CONCAT(jr.role SEPARATOR ', ') AS roles
    FROM companydetails cd
    LEFT JOIN job_roles jr ON cd.id = jr.company_id
    WHERE cd.id = ?
    GROUP BY cd.id`;

  db.query(sql, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching company details:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Profile route to get user data based on email and userType
app.get('/api/profile', (req, res) => {
  const { email, userType } = req.query;

  if (!email || !userType) {
    return res.status(400).json({ success: false, message: "Email and userType are required" });
  }

  let query;
  if (userType === 'student') {
    query = 'SELECT usn, name, email FROM studentdetails WHERE email = ?';
  } else if (userType === 'staff') {
    query = 'SELECT usn, name, email FROM staffdetails WHERE email = ?';
  } else {
    return res.status(400).json({ success: false, message: "Invalid userType" });
  }

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile: results[0] });
  });
});

app.put('/api/profile/update', (req, res) => {
  const { email, name, newEmail } = req.body;

  if (!email || !name || !newEmail) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const query1 = 'UPDATE studentdetails SET name = ?, email = ? WHERE email = ?';
  const query2 = 'UPDATE slogin SET email = ? WHERE email = ?';

  // Update studentdetails table first
  db.query(query1, [name, newEmail, email], (err, results1) => {
    if (err) {
      console.error('Error updating profile data in studentdetails:', err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results1.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Profile not found in studentdetails" });
    }

    // If studentdetails update is successful, update slogin table
    db.query(query2, [newEmail, email], (err, results2) => {
      if (err) {
        console.error('Error updating email in slogin:', err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      if (results2.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Profile not found in slogin" });
      }

      // Both updates successful
      res.json({ success: true, profile: { name, email: newEmail } });
    });
  });
});

// Update company details with async/await and promise wrapper
app.put('/api/companies/update/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const {
    name, description, istop, ishiring, weblink, Location, headquarters,
    job_locations, education, skills, cgpa, salary_range, benefits, 
    application_process, study_pattern, drive_link, contact_email, 
    contact_phone, linkedin_url, twitter_url
  } = req.body;

  const query = `
    UPDATE companydetails SET
      name = ?, description = ?, istop = ?, ishiring = ?, weblink = ?,
      headquarters = ?, job_locations = ?, education = ?, skills = ?, cgpa = ?, 
      salary_range = ?, benefits = ?, application_process = ?, study_pattern = ?, 
      drive_link = ?, contact_email = ?, contact_phone = ?, linkedin_url = ?, 
      twitter_url = ?
    WHERE id = ?`;

  const values = [
    name, description, istop, ishiring, weblink, headquarters,
    job_locations, education, skills, cgpa, salary_range, benefits, 
    application_process, study_pattern, drive_link, contact_email, 
    contact_phone, linkedin_url, twitter_url, companyId
  ];

  try {
    // Use promise() wrapper here
    await db.promise().query(query, values);
    res.status(200).send('Company details updated successfully');
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).send('Error updating company');
  }
});

// Delete a specific company by ID
app.delete('/api/companies/:companyId', (req, res) => {
  const { companyId } = req.params;
  
  const sql = 'DELETE FROM companydetails WHERE id = ?';

  db.query(sql, [companyId], (err, result) => {
    if (err) {
      console.error('Error deleting company:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    
    res.status(200).json({ success: true, message: 'Company deleted successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
