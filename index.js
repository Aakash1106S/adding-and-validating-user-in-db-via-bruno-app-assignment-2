const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mock database (replace this with actual database calls in real implementation)
const usersDb = [
  { 
    email: 'test@example.com', 
    passwordHash: '$2b$10$A0uX3QGi58h4ksOk1yB6r.5XeRYe1ldbrxWQ7BHZ26OXJlqkvgFiu' // 'password123' hashed using bcrypt
  }
];

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Step 2: Check if the user exists in the "database"
  const user = usersDb.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Step 3: Compare the provided password with the stored hashed password
  try {
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    // Step 4: Return response based on password match
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
