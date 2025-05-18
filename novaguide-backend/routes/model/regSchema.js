// Import mongoose for database operations
const mongoose = require('mongoose');

// Define a schema for user registration
const regSchema = new mongoose.Schema({
    // Name of the user, trimmed to remove extra spaces
    name: {
        type: String,
        trim: true
    },
    // User email, must be unique and is required
    email: {
        type: String,
        unique: true,
        required: true
    },
    // Hashed password of the user
    hashedPassword: {
        type: String
    },
    // Subscription plan of the user (e.g., Free, Pro, Advanced)
    plan: {
        type: String
    },
    // Payment time recorded when user subscribes
    payTime: {
        type: String
    },
    // End date of the current subscription
    endDate: {
        type: String
    }
});

// Create a model named 'userRegisters' using the regSchema
const reg = mongoose.model('userRegisters', regSchema);

// Export the model to use it in other files
module.exports = reg;
