const express = require('express');
const router = express.Router();
//const {User,Patient} = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'qwertyuiopasdfghjklzxcvbnbnm';


 // Login route for doctor
 router.post('/logindoctor', [
    body('name').isLength({ min: 1 }).withMessage('Name must be at least 1 character long'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    try {
      if (!global.doctordata) {
        throw new Error("Doctor data is not loaded");
      }
  
      // Find the doctor by name, email, and password
      const doctorData = global.doctordata.find(doc => doc.name === name && doc.email === email && doc.password === password);
      if (!doctorData) {
        return res.status(400).json({ errors: "Invalid login credentials" });
      }
  
      // Generate auth token
      const data = {
        doctor: {
          id: doctorData._id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);
  
      return res.json({ success: true, authToken });
  
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });


  
// Get all doctors
router.get('/doctors', (req, res) => {
    try {
      if (!global.doctordata) {
        throw new Error("Doctor data is not loaded");
      }
      res.json(global.doctordata);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  module.exports = router;