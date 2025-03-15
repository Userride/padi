const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the age sub-schema
const ageSchema = new Schema({
    years: {
        type: Number,
        min: 0
    },
    months: {
        type: Number,
        min: 0,
        max: 11
    }
});

// Define the medications sub-schema
const medicationSchema = new Schema({
    type: String,  // Remove 'required' temporarily for debugging
    name: String,
    dosage: String,
    amount: String,  // Keep as String to match form input
    frequency: String,
    time_of_administration: String,
    duration: String,
    route: String,
    special_instructions: String,
    precautions: String
});

// Define the prescription schema
const PrescriptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: ageSchema,
    sex: {
        type: String,
        enum: ['male', 'female', 'Male', 'Female', 'others'],
        required: true
    },
    present_visit: {
        type: Date,
        required: true
    },
    last_visit: {
        type: Date,
        required: false // Optional field
    },
    visit_number: {
        type: String,
        required: false // Optional field
    },
    appointment_id: {         
        type: String,
        required: false
    },
    slot_no: {              
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: false // Optional field
    },
    medical_history: {
        type: String,
        required: false // Optional field
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: false // Optional field
    },
    bp_systolic: {
        type: Number,
        required: true
    },
    bp_diastolic: {
        type: Number,
        required: true
    },
    heart_rate: {
        type: Number,
        required: true
    },
    respiratory_rate: {
        type: Number,
        required: true
    },
    oxygen_saturation: {
        type: Number,
        required: true
    },
    blood_sugar: {
        type: Number,
        required: true
    },
    chief_complain: {
        type: String,
        required: true
    },
    other_findings: {
        type: String,
        required: false // Optional field
    },
    provisional_diagnosis: {
        type: String,
        required: true
    },
    confirmation_tests: {
        type: String,
        required: false // Optional field
    },
    medications: [medicationSchema],
 
    refills: {
        type: Number,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
