const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure bodyParser is used

// Routes
const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');
app.use('/api', todoRoute);
app.use('/auth', userRoute);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
