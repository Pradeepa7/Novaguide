// Load environment variables at the top
require('dotenv').config();

// Import required modules
var express = require('express');
var router = express.Router();
var regSchema = require('../routes/model/regSchema'); // Import the registration schema
var bcrypt = require('bcrypt'); // Import bcrypt for password hashing comparison
var jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating JWT tokens

/* GET login listing. */
router.get('/', function(req, res, next) {
  // Send a test response
  res.send('respond with a resource');
});

// POST route to handle user login
router.post('/userLogin', async function(req, res, next) {
  console.log(req.body);
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find user by email in database
    const userDetails = await regSchema.findOne({ email });

    // If user not found, return error
    if (!userDetails) {
      return res.status(404).json({
        message: 'No user email found'
      });
    }

    // Get hashed password from user data
    const savedPwd = userDetails.hashedPassword;
    console.log(savedPwd);

    // Compare entered password with hashed password
    const isValidPwd = await bcrypt.compare(password, savedPwd);
    console.log(isValidPwd);

    // If password doesn't match, return error
    if (!isValidPwd) {
      return res.status(401).json({
        message: 'password is incorrect'
      });
    }

    // Get current date and time
    const curTime = new Date();

    // Get subscription end date
    const expiryTime = new Date(userDetails.endDate);
    console.log(expiryTime);

    // If current time is after subscription expiry, return error
    if (curTime > expiryTime) {
      return res.status(403).json({
        message: 'Your plan has expired. Please upgrade.'
      });
    }

    // Use your env variable
    const secretKey = process.env.JWT_SECRET;

    // Create a JWT token valid for 1 hour
    const token = await jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    // Send success response with token
    res.status(200).json({
      status: 'Login Success..',
      token
    });
  }
  // Catch any unexpected errors and return a 500 error
  catch (e) {
    res.status(500).json({
      status: 'error',
      error: e.message
    });
  }
});

// Export the router module
module.exports = router;
