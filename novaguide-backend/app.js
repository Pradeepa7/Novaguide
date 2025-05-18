// Load environment variables at the top
require('dotenv').config();

// Required module imports
var createError = require('http-errors'); // Module to create HTTP errors
var express = require('express'); // Express web framework
var path = require('path'); // Node.js utility for handling file paths
var cookieParser = require('cookie-parser'); // Middleware to parse cookies
var logger = require('morgan'); // HTTP request logger middleware
var cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing

// Import route files
var fileRouter = require('./routes/fileContent'); //route for file content
var indexRouter = require('./routes/index'); // Route for home
var usersRouter = require('./routes/users'); // Route for users
var regRouter = require('./routes/registrationPage'); // Route for registration logic
var loginRouter = require('./routes/login'); // Route for login logic

var app = express(); // Create Express app instance

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views')); // Set directory for views
app.set('view engine', 'jade'); // Set view engine (Jade/Pug)

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(logger('dev')); // Log HTTP requests in development format
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads
app.use(cookieParser()); // Parse cookies attached to client request
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Route handling
app.use('/', indexRouter); // Handle base route
app.use('/users', usersRouter); // Handle /users route
app.use('/register', regRouter); // Handle /register route
app.use('/login', loginRouter); // Handle /login route
app.use('/filecontent', fileRouter); // Handle /ask route

// Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // Create 404 error and pass to next middleware
});

// General error handler
app.use(function(err, req, res, next) {
  // Set local variables to show error message; show full error in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set HTTP status and render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // Export the app module
