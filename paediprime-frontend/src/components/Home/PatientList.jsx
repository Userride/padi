import { useState, useEffect } from "react";
import axios from "axios";
import './PatientList.css';

const PatientList = () => {
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const slots = ["9Am-11Am", "2pm-4pm", "7pm-9pm"];

  // Load patients from local storage on component mount
  useEffect(() => {
    const savedPatients = localStorage.getItem('filteredPatients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Handle doctor name input change
  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  // Handle appointment date input change
  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  // Handle slot selection change
  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Function to fetch all patients and filter based on criteria
  const fetchPatients = async (doctorName, date, slot) => {
    try {
      const response = await axios.get(`https://paediprime-4chb.onrender.com/api/patients`);

      // Filter patients on the frontend
      const filteredPatients = response.data.filter(
        (patient) =>
          patient.doctorname === doctorName &&
          new Date(patient.dateofappointment).toISOString().split('T')[0] === date &&
          patient.slot === slot
      );

      // Sort by serial number
      const sortedPatients = filteredPatients.sort((a, b) => a.serialNumber - b.serialNumber);

      // Extract patient names and store in local storage
      const patientNames = sortedPatients.map((patient) => patient.patientName);
      localStorage.setItem('patientNames', JSON.stringify(patientNames));

      // Store the sorted list in local storage
      localStorage.setItem('filteredPatients', JSON.stringify(sortedPatients));

      setPatients(sortedPatients);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
      setPatients([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctorName && appointmentDate && selectedSlot) {
      fetchPatients(doctorName, appointmentDate, selectedSlot);
    } else {
      setError("Please provide doctor name, appointment date, and slot.");
    }
  };

  return (
    <div className="patient-list-container">
      <h2>Track Your Appointment Time</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <label>
          Doctor Name:
          <input
            type="text"
            value={doctorName}
            onChange={handleDoctorNameChange}
            required
          />
        </label>
        <label>
          Appointment Date:
          <input
            type="date"
            value={appointmentDate}
            onChange={handleDateChange}
            required
          />
        </label>
        <label>
          Slot:
          <select value={selectedSlot} onChange={handleSlotChange} required>
            <option value="">Select Slot</option>
            {slots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {patients.length > 0 ? (
        <ul className="patient-list">
          {patients.map((patient) => (
            <li key={patient._id}>
              <span className="serial-number">Serial Number: {patient.serialNumber}</span> - 
              <span className="name"> Name: {patient.patientName}</span> - 
              <span className="clinic"> Clinic: {patient.clinicLocation}</span> - 
              <span className="appointment-number"> Appointment Number: {patient.appointmentNumber}</span>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No patients found for the given criteria.</p>
      )}
    </div>
  );
};

export default PatientList;
