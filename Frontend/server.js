const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user storage (in a real app, use a database)
const users = [];
let userIdCounter = 1;

// Helper function to generate a simple JWT-like token
const generateToken = (user) => {
  return Buffer.from(JSON.stringify(user)).toString('base64');
};

// Register endpoint
app.post('/auth/register', (req, res) => {
  console.log('Registration request received:', req.body);
  
  const { email, password, name, avatar } = req.body;
  
  // Validate required fields
  if (!email || !password || !name) {
    return res.status(400).json({ msg: 'Please provide email, password, and name' });
  }
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ msg: 'User with this email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: userIdCounter++,
    email,
    name,
    avatar: avatar || null,
    createdAt: new Date()
  };
  
  // Store user (password should be hashed in real app)
  users.push({ ...newUser, password });
  
  // Generate token
  const token = generateToken(newUser);
  
  console.log('User registered successfully:', newUser);
  res.json({ token, user: newUser });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }
  
  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user;
  
  // Generate token
  const token = generateToken(userWithoutPassword);
  
  console.log('User logged in successfully:', userWithoutPassword);
  res.json({ token, user: userWithoutPassword });
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Bubbly Auth Server is running!', users: users.length });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET  / (test)');
  console.log('- POST /auth/register');
  console.log('- POST /auth/login');
});
