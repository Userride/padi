// routes/doctorTimes.js

const express = require('express');
const router = express.Router();
const DoctorTimes = require('../models/DoctorTimes');

// Route to set check-in time
router.post('/check-in', async (req, res) => {
  const { doctorId } = req.body;
  try {
    let doctorTimes = await DoctorTimes.findOne({ doctorId });
    if (!doctorTimes) {
      doctorTimes = new DoctorTimes({ doctorId });
    }
    doctorTimes.checkInTime = new Date();
    await doctorTimes.save();
    res.status(200).json({ message: 'Check-in time recorded', checkInTime: doctorTimes.checkInTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to set check-out time
router.post('/check-out', async (req, res) => {
  const { doctorId } = req.body;
  try {
    let doctorTimes = await DoctorTimes.findOne({ doctorId });
    if (!doctorTimes) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctorTimes.checkOutTime = new Date();
    await doctorTimes.save();
    res.status(200).json({ message: 'Check-out time recorded', checkOutTime: doctorTimes.checkOutTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get check-in and check-out times
router.get('/latest-check-in', async (req, res) => {
    try {
      const doctorTimes = await DoctorTimes.findOne().sort({ checkInTime: -1 });
      if (!doctorTimes) {
        return res.status(404).json({ message: 'No check-in times found' });
      }
      res.status(200).json({ checkInTime: doctorTimes.checkInTime });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
