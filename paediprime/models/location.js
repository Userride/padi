const mongoose = require('mongoose');
const { Schema } = mongoose;

// Location Schema
const LocationSchema = new Schema({
    location: {
        type: String, // Ensure this is String to match your data type
        required: true
    }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
