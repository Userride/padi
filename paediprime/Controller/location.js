const express = require('express');
const router = express.Router();
const Location = require('../models/location'); // Import the Location model correctly

router.post('/location', async (req, res) => {
    const newLocation = new Location(req.body);
    try {
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    } catch (err) {
        console.error("Error saving location:", err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
