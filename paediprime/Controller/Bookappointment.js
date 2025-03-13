const express = require('express');
const router = express.Router();
const { Patient } = require('../models/User');
const { TimePrediction } = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to generate a serial number based on the doctor, date, and slot
const generateSerialNumber = async (doctorname, dateofappointment, slot) => {
  try {
    const count = await Patient.countDocuments({ doctorname, dateofappointment, slot });
    return count + 1; // Serial number starts from 1
  } catch (error) {
    throw new Error('Error generating serial number');
  }
};

// Function to check if the current time falls within the given slot time range
const isTimeWithinSlot = (currentTimestamp, slot) => {
  const [start, end] = slot.split('-');
  const parseTime = (time) => {
    const [hourString, meridian] = time.match(/(\d+)(am|pm)/i).slice(1);
    let hour = parseInt(hourString);
    if (meridian.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridian.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }
    return hour;
  };

  const startHour = parseTime(start);
  const endHour = parseTime(end);
  const startTime = new Date();
  startTime.setHours(startHour, 0, 0, 0);
  const endTime = new Date();
  endTime.setHours(endHour, 0, 0, 0);

  return currentTimestamp >= startTime.getTime() && currentTimestamp <= endTime.getTime();
};

// Function to check if the appointment date matches the current date
const isDateMatched = (appointmentDate) => {
  const today = new Date();
  const appointment = new Date(appointmentDate);
  return today.toDateString() === appointment.toDateString();
};

// Function to generate a unique appointment number
const generateAppointmentNumber = () => {
  const now = Date.now().toString();
  return `APT-${now}`;
};

router.get('/patients/name/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Fetching patients with name:', name);
  try {
    const patients = await Patient.find({ patientName: name }).sort({ createdAt: -1 });
    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found with the given name' });
    }
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients by name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add symptoms to an existing patient
router.post('/patients/:patientId/symptoms', async (req, res) => {
  const { patientId } = req.params;
  const { symptoms } = req.body;

  try {
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms should be an array of strings.' });
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    patient.symptoms = symptoms;
    await patient.save();
    res.status(200).json({ message: 'Symptoms added successfully', patient });
  } catch (error) {
    console.error('Error adding symptoms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to create a new patient appointment
router.post('/patients', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { doctorname, clinicLocation, dateofappointment, slot, predictedConsultationTime } = req.body;

    if (!doctorname || !clinicLocation || !dateofappointment || !slot || !predictedConsultationTime) {
      throw new Error('Missing required fields');
    }

    const serialNumber = await generateSerialNumber(doctorname, dateofappointment, slot);
    const appointmentNumber = generateAppointmentNumber();

    const patientData = {
      ...req.body,
      serialNumber,
      appointmentNumber,
      doctorname,
      clinicLocation,
      predictedConsultationTime
    };

    const patient = await Patient.create(patientData);
    res.json(patient);
  } catch (error) {
    console.error('Error creating patient appointment:', error);
    res.status(400).json({ error: error.message });
  }
});

// Updated /time-prediction endpoint to include additional fields
router.post('/time-prediction', async (req, res) => {
  try {
    console.log("📢 Received Time Prediction Request:", req.body);

    const { patientAge, estimatedConsultationDuration, recommendedSlot, slot, dateofappointment, serialNumber, doctorname, clinicLocation } = req.body;

    if (!patientAge || !estimatedConsultationDuration || !recommendedSlot || !slot || !dateofappointment || !serialNumber || !doctorname || !clinicLocation) {
      console.error("🚨 Missing required fields:", req.body);
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timePrediction = new TimePrediction({
      patientAge,
      estimatedConsultationDuration,
      recommendedSlot,
      slot,
      dateofappointment,
      serialNumber,
      doctorname,
      clinicLocation
    });

    await timePrediction.save();
    console.log("✅ Time Prediction Saved:", timePrediction);
    res.json(timePrediction);
  } catch (error) {
    console.error("🚨 Error saving time prediction:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.json(patients);
  } catch (error) {
    console.error('Error fetching all patients:', error);
    res.status(500).json({ message: 'Error fetching all patients' });
  }
});

router.get('/patients/latest', async (req, res) => {
  try {
    const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
    res.json(latestPatient);
  } catch (error) {
    console.error('Error fetching latest patient appointment:', error);
    res.status(500).json({ error: 'Error fetching latest patient appointment' });
  }
});

router.get('/patients/doctor/:doctorname/slot/:timestamp', async (req, res) => {
  const { doctorname, timestamp } = req.params;
  const currentTimestamp = parseInt(timestamp);

  try {
    const patients = await Patient.find({ doctorname: doctorname });
    const filteredPatients = patients.filter(patient => 
      isDateMatched(patient.dateofappointment) && isTimeWithinSlot(currentTimestamp, patient.slot)
    );

    if (filteredPatients.length === 0) {
      return res.status(404).json({ message: 'No patients found for the current time slot and appointment date' });
    }
    res.json(filteredPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/payment', async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: "Appointment Booking",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 100 * 90,
      currency: 'inr',
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      customer_email: 'demo@gmail.com',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
