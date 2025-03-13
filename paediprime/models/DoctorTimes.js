// models/DoctorTimes.js

const mongoose = require('mongoose');

const doctorTimesSchema = new mongoose.Schema({
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
});

module.exports = mongoose.model('DoctorTimes', doctorTimesSchema);
