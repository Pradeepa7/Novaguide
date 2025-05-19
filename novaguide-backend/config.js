// Import mongoose package to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using connection string from environment variable
mongoose.connect(process.env.MONGO_URI)
  // If connection is successful, log message to console
  .then(() => console.log('Connected!'));
