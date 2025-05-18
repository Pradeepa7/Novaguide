var express = require('express');
var router = express.Router();
var regSchema = require('./model/regSchema'); // Importing registration schema/model
var bcrypt = require('bcrypt'); // For hashing passwords

/* GET registration listing. */
router.get('/', function (req, res, next) {
  // Default route to test API
  res.send('respond with a resource');
});

// POST route to store user data into database
router.post('/', async function (req, res, next) {
  console.log(req.body); // Log the request body
  try {
    const data = new regSchema(req.body); // Create new instance of schema with request data
    await data.save(); // Save to database
    res.json({
      status: 'success'
    });
  } catch (e) {
    res.json({
      status: 'error',
      error: e.message
    });
  }
});

// Verify if email is already registered
router.post('/verify', async function (req, res, next) {
  console.log(req.body); // Log the request body
  try {
    // Destructure email from user request
    const {
      user: { email }
    } = req.body;

    // Check if the email already exists in database
    const emailExisting = await regSchema.findOne({ email });

    // If email exists, return error with 409 Conflict status
    if (emailExisting) {
      return res.status(409).json({
        status: 'error',
        message: "Email already Exists"
      });
    }

    // If email does not exist, return success response
    return res.status(200).json({
      status: 'success',
      message: 'Registration success'
    });

  } catch (e) {
    // Catch and return any other errors with 500 Internal Server Error
    res.status(500).json({
      status: 'error',
      error: e.message
    });
  }
});

// POST route to save user registration with hashed password and plan
router.post('/save', async function (req, res, next) {
  console.log(req.body); // Log the request body
  try {
    // Destructure request data
    const { name, email, password, plan } = req.body;

    // Store current date and time
    const payTime = new Date();
    let expiryTime;

    // Determine expiry time in days based on plan
    switch (plan) {
      case "Free":
        expiryTime = 1;
        break;
      case "Pro":
        expiryTime = 7;
        break;
      case "Advanced":
        expiryTime = 30;
        break;
      default:
        console.log("No plan");
    }

    // Calculate expiry date based on payTime and expiryTime
    const endDate = new Date(payTime.getTime() + expiryTime * 24 * 60 * 60 * 1000);

    // Set salt value for bcrypt
    const salt = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword); // Log hashed password

    // Create new data object with hashed password and other fields
    const newData = {
      name,
      email,
      hashedPassword,
      plan,
      payTime,
      endDate
    };

    console.log(newData); // Log the data to be saved

    // Save new data to database
    const data = new regSchema(newData);
    await data.save();

    // Respond with success status
    res.status(200).json({
      status: 'success'
    });
  } catch (e) {
    // Respond with error status and message
    res.status(200).json({
      status: 'error',
      error: e.message
    });
  }
});

module.exports = router; // Export the router for use in app.js or server.js
