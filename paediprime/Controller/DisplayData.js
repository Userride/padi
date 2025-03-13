const express = require('express');
const router = express.Router();

// Route to fetch doctor details based on the doctor's name
router.get('/doctor-details', (req, res) => {
    try {
        const { name } = req.query; // Use query params for GET requests
        const doctor = global.doctordata2.find(doc => doc.name === name);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).send('Doctor not found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/doctor-details', (req, res) => {
    try {
        const { name } = req.body; // Use body for POST requests
        const doctor = global.doctordata2.find(doc => doc.name === name);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).send('Doctor not found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET and POST routes for /doctordata
router.get('/doctordata', (req, res) => {
    try {
        res.json(global.doctordata);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/doctordata', (req, res) => {
    try {
        res.json(global.doctordata);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET and POST routes for /doctordata2
router.get('/doctordata2', (req, res) => {
    try {
        console.log(global.doctordata2);
        res.json(global.doctordata2);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/doctordata2', (req, res) => {
    try {
        console.log(global.doctordata2);
        res.json(global.doctordata2);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET and POST routes for /clinic-details
router.get('/clinic-details', (req, res) => {
    try {
        const { location } = req.query; // Use query params for GET requests
        console.log("Location received:", location);
        const clinic = global.doctordata3.find(cl => cl.location === location);
        if (clinic) {
            const { name, location, clinicTime, about } = clinic;
            res.json({ name, location, clinicTime, about });
        } else {
            res.status(404).send('Clinic not found');
        }
    } catch (error) {
        console.error("Error in /clinic-details route:", error.message);
        res.status(500).send('Server error');
    }
});

router.post('/clinic-details', (req, res) => {
    try {
        const { location } = req.body; // Use body for POST requests
        console.log("Location received:", location);
        const clinic = global.doctordata3.find(cl => cl.location === location);
        if (clinic) {
            const { name, location, clinicTime, about } = clinic;
            res.json({ name, location, clinicTime, about });
        } else {
            res.status(404).send('Clinic not found');
        }
    } catch (error) {
        console.error("Error in /clinic-details route:", error.message);
        res.status(500).send('Server error');
    }
});

// GET and POST routes for /doctordata3
router.get('/doctordata3', (req, res) => {
    try {
        res.json(global.doctordata3);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/doctordata3', (req, res) => {
    try {
        res.json(global.doctordata3);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET and POST routes for /doctordata4
router.get('/doctordata4', (req, res) => {
    try {
        res.json(global.doctordata4);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/doctordata4', (req, res) => {
    try {
        res.json(global.doctordata4);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;