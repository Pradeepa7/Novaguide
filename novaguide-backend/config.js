// Import mongoose package to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB database named 'internship' on localhost at default port 27017
mongoose.connect('mongodb://localhost:27017/internship')
  // If connection is successful, log message to console
  .then(() => console.log('Connected!'));
