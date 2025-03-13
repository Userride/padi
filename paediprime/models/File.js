const mongoose = require('mongoose');

// Define the schema for the File model
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true, // File name is required
  },
  uploadDate: {
    type: String,
    required: true, // Date of upload is required
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model where each file belongs to a user
    required: true, // Each file must be associated with a user
  },
}, { timestamps: true }); // This adds 'createdAt' and 'updatedAt' automatically

// Create the model
const File = mongoose.model('File', fileSchema);

module.exports = File;
