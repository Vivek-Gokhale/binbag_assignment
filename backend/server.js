const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./utils/db');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for profile and expense images
app.use('/profile-image', express.static(path.join(__dirname, 'images')));
app.use('/expense-image', express.static(path.join(__dirname, 'billsImage')));

// Routes
app.use('/', routes);

// Error handling
app.use(errorHandler);

// Database connection
connectDB()
  .then(() => {
    logger.info('Connected to MongoDB Atlas');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB Atlas', error);
  });

module.exports = app;
