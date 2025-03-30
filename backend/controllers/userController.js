const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const config = require('../utils/config');

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, config.jwtSecret, {
    expiresIn: '1h',
  });
};

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, address, password, bio, profilePicture } = req.body;

    if (!name || !email || !address || !password) {
      return res.status(400).json({ message: 'Name, email, address, and password are required' });
    }

    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, address, password: hashedPassword, bio, profilePicture });

    const token = generateToken(newUser);
    res.status(201).json({ message: 'User registered successfully', email: newUser.email, token });
  } catch (error) {
    logger.error('Error creating user', error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    const user = await User.getByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Error retrieving user', error);
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    if (req.user.email !== req.body.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { email, name, address, bio, profilePicture } = req.body;
    const updatedUser = await User.updateByEmail(email, { name, address, bio, profilePicture });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or update failed' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    logger.error('Error updating user', error);
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  editUser,
  authenticateUser,
};