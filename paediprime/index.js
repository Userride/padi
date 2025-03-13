const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDB = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const File = require('./models/File'); // Ensure this path is correct
const axios=require('axios');

// const { PasspORt } = require("./utils/passport")
// const session = require("express-session")
// const { GoogleProvider } = require("./utils/GoogleStregy")

dotenv.config({ path: './config.env' });

const app = express();

const url = `https://paediprime-4chb.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(cors({
    origin: ['https://www.paediprime.tech', 'http://localhost:5173'] // Replace with your frontend URL
}));
app.use(express.json());
app.use(bodyParser.json());

// app.use(PasspORt.initialize())
// app.use(PasspORt.session())
// PasspORt.use(GoogleProvider)

// Routes
const { router: createUserRouter, loggedInPatientName } = require('./Controller/CreateUser');
const displayDataRouter = require('./Controller/DisplayData');
const prescriptionRouter = require('./Controller/Prescription');
const bookAppointmentRouter = require('./Controller/Bookappointment');
const doctorLoginRouter = require('./Controller/Doctorlogin');
const doctorTimesRouter = require('./Controller/doctorTimes');
const locationRouter = require('./Controller/location');

app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api/prescription', prescriptionRouter);
app.use('/api', bookAppointmentRouter);
app.use('/api', doctorLoginRouter);
app.use('/api/doctor-times', doctorTimesRouter);
app.use('/api', locationRouter);

// Simple GET route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().split('T')[0];
    cb(null, `${file.originalname}`);
  },
});

// Multer upload middleware configuration
const upload = multer({ storage });
const JWT_SECRET = 'qwertyuiopasdfghjklzxcvbnbnm';

// Middleware to validate token and authenticate user
const fetchUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

// Upload Endpoint
app.post('/upload', fetchUser, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newFile = new File({
      fileName: file.originalname,
      uploadDate: date,
      userId,
    });

    await newFile.save();
    res.json({ success: true, fileName: file.originalname, uploadDate: date });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Files by Date Endpoint
app.get('/files', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the user ID from the token
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    // Fetch files filtered by userId and date
    const files = await File.find({ userId, uploadDate: date });

    if (files.length === 0) {
      return res.status(404).json({ error: "No files found for the specified date" });
    }

    res.json({ files: files.map(file => file.fileName) });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Download Endpoint
app.get('/download', fetchUser, (req, res) => {
  const { date, filename } = req.query;

  if (!date || !filename) {
    return res.status(400).json({ message: 'Date and filename are required' });
  }

  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join('./uploads', decodedFilename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, decodedFilename); // Provide file download with original filename
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Initialize database connection and start server
mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database. Server not started.", err);
});
