const User = require('../models/user');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const cookieOptions = {
  httpOnly: true, 
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'strict', 
  maxAge: 5 * 60 * 60 * 1000, 
};

const signUp = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    const user = new User({ username, name, email, password });
    await user.save();

    const token = user.generateAuthToken();
    res.cookie('authToken', token, cookieOptions);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user', details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = user.generateAuthToken();
    res.cookie('authToken', token, cookieOptions);
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('authToken', '', { maxAge: 1 });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out', details: error.message });
  }
};

const authenticate = (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: 'No token provided.', isLogged: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isLogged: true, username: decoded.username });
  } catch (ex) {
    res.cookie('authToken', '', { maxAge: 1 });
    return res.status(401).json({ error: 'Invalid token.', isLogged: false });
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (ex) {
    res.cookie('authToken', '', { maxAge: 1 });
    return res.status(400).json({ error: 'Invalid token. Token has been cleared.' });
  }
};

module.exports = { signUp, login, logout, authenticate, authMiddleware };