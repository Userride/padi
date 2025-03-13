const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// GET all prescriptions
router.get('/', async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Enhanced POST route
router.post('/', async (req, res) => {
    try {
      // Clean medication data
      const cleanedMedications = req.body.medications?.map(med => ({
        type: med.type || 'Unknown',
        name: med.name || 'Unknown',
        dosage: med.dosage || '',
        amount: med.amount?.toString() || '',
        frequency: med.frequency || '',
        time_of_administration: med.time_of_administration || '',
        duration: med.duration || '',
        route: med.route || '',
        special_instructions: med.special_instructions || '',
        precautions: med.precautions || ''
      })) || [];
  
      const prescriptionData = {
        ...req.body,
        medications: cleanedMedications
      };
  
      const newPrescription = new Prescription(prescriptionData);
      const savedPrescription = await newPrescription.save();
      
      res.status(201).json(savedPrescription);
    } catch (err) {
      console.error("Full Error Object:", err);
      console.error("Validation Errors:", err.errors);
      res.status(400).json({
        error: err.message,
        fullError: JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      });
    }
  });

// GET the latest prescription
router.get('/latest', async (req, res) => {
    try {
        const latestPrescription = await Prescription.findOne().sort({ createdAt: -1 });
        if (latestPrescription) {
            res.json(latestPrescription);
        } else {
            res.status(404).json({ message: 'No prescriptions found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the latest prescription' });
    }
});

// GET a specific prescription by ID
router.get('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create a new prescription
router.post('/', async (req, res) => {
    const newPrescription = new Prescription(req.body);
    try {
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (err) {
        console.error("Error saving prescription:", err);
        res.status(400).json({ error: err.message });
    }
});

// PUT update a prescription by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(updatedPrescription);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a prescription by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all prescriptions for a patient with a specific name
router.get('/name/:name', async (req, res) => {
    const patientName = req.params.name;  //name model ka name hai
    try {
      const prescriptions = await Prescription.find({ name: patientName });
      if (prescriptions.length === 0) {
        return res.status(404).json({ message: 'No prescriptions found for this patient' });
      }
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Update route to fetch prescription by patient ID instead of name
router.get('/id/:id', async (req, res) => {
    const patientID = req.params._id;  // assuming the model has patientID field
    try {
      const prescriptions = await Prescription.find({ patientID: patientID });
      if (prescriptions.length === 0) {
        return res.status(404).json({ message: 'No prescriptions found for this patient' });
      }
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
// GET prescriptions for a patient with a specific name and exact date
router.get('/name/:name/date/:date', async (req, res) => {
    const patientName = req.params.name;
    const date = req.params.date;
    try {
      const prescriptions = await Prescription.find({
        name: patientName,
        createdAt: new Date(date) // Exact match for the provided date
      });
      if (prescriptions.length === 0) {
        return res.status(404).json({ message: 'No prescriptions found for this patient on this date' });
      }
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST reset the counter to 1
router.post('/reset-counter', async (req, res) => {
    try {
        const newPrescription = new Prescription({
            counter: 1,
        });
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Error resetting counter' });
    }
});

// GET the latest prescription for a patient by name
router.get('/latest/name/:name', async (req, res) => {
    const patientName = req.params.name;
    try {
        const prescriptions = await Prescription.find({ name: patientName })
            .sort({ createdAt: 1 }) // Sort by date in ascending order
            .exec();

        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No prescriptions found for this patient' });
        }

        // Find the prescription with the closest date to now
        const now = new Date();
        const closestPrescription = prescriptions.reduce((closest, current) => {
            return Math.abs(current.createdAt - now) < Math.abs(closest.createdAt - now)
                ? current
                : closest;
        });

        res.status(200).json(closestPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the latest prescription for the patient' });
    }
});

// POST save a new prescription and increment the counter
router.post('/save', async (req, res) => {
    try {
        const { prescriptionData } = req.body;

        // Find the most recent prescription to get the current counter value
        const latestPrescription = await Prescription.findOne().sort({ createdAt: -1 });
        const currentCounter = latestPrescription ? latestPrescription.counter : 0;

        // Create a new prescription with the incremented counter value
        const newPrescription = new Prescription({
            ...prescriptionData,
            counter: currentCounter + 1,
        });

        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Error saving prescription' });
    }
});

module.exports = router;
