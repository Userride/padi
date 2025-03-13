const mongoose = require('mongoose');
const { Schema } = mongoose;

// ✅ User Schema
const UserSchema = new Schema({
  parentName: { type: String, required: true },
  patientName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// ✅ Patient Schema
const patientSchema = new Schema({
  patientName: { type: String, required: true },
  parentName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  slot: { type: String, required: true },
  appointmentNumber: { type: String, required: true },
  dateofappointment: { type: Date, required: true },
  serialNumber: { type: Number, required: true },
  doctorname: { type: String, required: true },
  images: { type: [String], required: true },
  clinicLocation: { type: String, required: true },
  symptoms: { type: [String], required: false },
  recentlyVisited: { type: String, enum: ['yes', 'no'], required: true },
  visitCount: { type: Number, default: null }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

// ✅ TimePrediction Schema - updated with additional fields
const TimePredictionSchema = new Schema({
  patientAge: { type: Number, required: true },
  estimatedConsultationDuration: { type: String, required: true }, // e.g. "4 minutes 10 seconds"
  recommendedSlot: { type: String, required: true }, // e.g. "9Am-11Am"
  slot: { type: String, required: true },
  dateofappointment: { type: Date, required: true },
  serialNumber: { type: Number, required: true },
  doctorname: { type: String, required: true },
  clinicLocation: { type: String, required: true }
}, { timestamps: true });

const TimePrediction = mongoose.model('TimePrediction', TimePredictionSchema);

// ✅ Export all models
module.exports = { User, Patient, TimePrediction };
