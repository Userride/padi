import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './trackAppointment.css'; 
import doctorarrive from "./images/doctor-arrive.jpg";
import clock from "./images/clock.jpg";
import patiententer1 from "./images/patient-entering.jpg";
import patiententer2 from "./images/patient-entering2.jpg";
import openclinic from "./images/clinic-opening-icon.png";
import clinicimg from "./images/img1.avif";

const TrackAppointment = () => {
  const [showTimings, setShowTimings] = useState(false);
  // We now use three state variables to hold our computed times:
  // - clinicOpeningTime: the start of the slot (clinic opening)
  // - doctorArrivalTime: 5 minutes after clinic opening
  // - predictedExitTime: calculated based on serial number
  const [clinicOpeningTime, setClinicOpeningTime] = useState(null);
  const [doctorArrivalTime, setDoctorArrivalTime] = useState(null);
  const [predictedExitTime, setPredictedExitTime] = useState(null);

  const [appointmentData, setAppointmentData] = useState(null);

  const patientName = localStorage.getItem('patientName'); // Retrieve the patient name from localStorage

  useEffect(() => {
    fetchLoggedInPatientDetails(); // Fetch patient data matching the logged-in user’s name
    const interval = setInterval(() => {
      fetchLoggedInPatientDetails();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const fetchLoggedInPatientDetails = async () => {
    try {
      // Fetch logged-in user details (if needed)
      const userResponse = await fetch('https://paediprime-4chb.onrender.com/api/users');
      if (!userResponse.ok) {
        console.error('Failed to fetch logged-in user details, status:', userResponse.status);
        return;
      }
      const loggedInUser = await userResponse.json();
      console.log('Logged-in User:', loggedInUser);
      const loggedInPatientName = loggedInUser?.patientName;
      const loggedInParentName = loggedInUser?.parentName;

      // Fetch patients with the same name
      const response = await fetch(`https://paediprime-4chb.onrender.com/api/patients/name/${patientName}`);
      if (response.ok) {
        const patientsWithSameName = await response.json();
        console.log('Patients with Same Name:', patientsWithSameName);

        // Find the latest patient matching the logged-in patient’s name and parent's name
        const latestMatchingPatient = patientsWithSameName
          .filter(
            patient =>
              patient.patientName === loggedInPatientName &&
              patient.parentName === loggedInParentName
          )
          .reduce((latest, current) =>
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest,
            patientsWithSameName[0]
          );

        if (latestMatchingPatient) {
          setAppointmentData(latestMatchingPatient);
          localStorage.setItem('appointmentData', JSON.stringify(latestMatchingPatient));
        } else {
          setAppointmentData({
            patientName: null,
            parentName: null,
            dateofappointment: null,
            slot: null,
            appointmentNumber: null,
            serialNumber: null
          });
        }
      } else {
        console.error('Failed to fetch patients with the same name, status:', response.status);
        setAppointmentData({
          patientName: null,
          parentName: null,
          dateofappointment: null,
          slot: null,
          appointmentNumber: null,
          serialNumber: null
        });
      }
    } catch (error) {
      console.error('Error fetching patients with the same name:', error);
      setAppointmentData({
        patientName: null,
        parentName: null,
        dateofappointment: null,
        slot: null,
        appointmentNumber: null,
        serialNumber: null
      });
    }
  };

  // Helper to parse a time string like "9Am" or "9:00 Am" into an object with hour and minute.
  const parseTimeString = (timeStr) => {
    timeStr = timeStr.trim();
    const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (match) {
      let hour = parseInt(match[1], 10);
      let minutes = match[2] ? parseInt(match[2], 10) : 0;
      const meridian = match[3].toLowerCase();
      if (meridian === 'pm' && hour !== 12) hour += 12;
      if (meridian === 'am' && hour === 12) hour = 0;
      return { hour, minutes };
    }
    return null;
  };

  // When "Check Your Time" is clicked, compute all times dynamically
  const handleCheckTimeClick = () => {
    if (!appointmentData || !appointmentData.slot || !appointmentData.dateofappointment || !appointmentData.serialNumber) {
      console.error("Incomplete appointment data");
      return;
    }
    
    // Assume the slot is provided as a string, e.g. "9Am-11Am"
    const { slot, dateofappointment, serialNumber } = appointmentData;
    const [slotStart, slotEnd] = slot.split('-');
    
    const timeParts = parseTimeString(slotStart);
    if (!timeParts) {
      console.error("Invalid slot start time format");
      return;
    }
    
    // Create a Date object for the appointment date using the date from appointmentData.
    // This ensures the timing uses the appointment's day.
    const appointmentDate = new Date(dateofappointment);
    // Set clinic opening time to the slot's starting time on the appointment day.
    const computedClinicOpeningTime = new Date(appointmentDate);
    computedClinicOpeningTime.setHours(timeParts.hour, timeParts.minutes, 0, 0);
    
    // Doctor arrival time is 5 minutes after the clinic opening time.
    const computedDoctorArrivalTime = new Date(computedClinicOpeningTime.getTime() + 5 * 60000);
    
    // Compute predicted exit time.
    // Here, we assume an average time (e.g., 15 minutes) per patient before the logged in patient.
    // For the first patient (serialNumber = 1) there is no waiting time.
    const averageTimePerPatient = 15; // in minutes
    const waitingTimeMillis = (serialNumber - 1) * averageTimePerPatient * 60000;
    const computedPredictedExitTime = new Date(computedClinicOpeningTime.getTime() + waitingTimeMillis);
    
    // Update our states with the computed values.
    setClinicOpeningTime(computedClinicOpeningTime);
    setDoctorArrivalTime(computedDoctorArrivalTime);
    setPredictedExitTime(computedPredictedExitTime);
    setShowTimings(true);
  };

  const formatTime = (time) => {
    if (!time) return 'Fetching...';
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="appointment-container">
      <header className="header">
        <button className="track-appointment-button">TRACK YOUR APPOINTMENT</button>
      </header>

      {!appointmentData ? (
        <div className="static-content">
          <h2>No appointment data available</h2>
          <p>Please check back later or contact support for assistance.</p>
        </div>
      ) : (
        <div className="appointment-card">
          <div className="clinic-info trackclinic">
            <div className="profile-pic">
              <img src={clinicimg} alt="Clinic" />
            </div>
            <div className="clinic-details track">
              <h2>
                Clinic: Paediprime{' '}
                <Link to="/AppointmentClinic">
                  <button className="view-profile-button">View Clinic</button>
                </Link>
              </h2>
              <p>
                <span>Location:</span> {appointmentData.clinicLocation || 'N/A'}
              </p>
              <p className="doctorname">
                Doctor's Name: {appointmentData.doctorname || 'N/A'}
              </p>
              <p>
                <span>Appointment Date:</span>{' '}
                {appointmentData.dateofappointment
                  ? new Date(appointmentData.dateofappointment).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <span>Slot Time:</span> {appointmentData.slot || 'N/A'}
              </p>
              <p>
                <span>Appointment ID:</span> {appointmentData.appointmentNumber || 'N/A'}
              </p>
              <p>
                <span>Sl No.:</span> {appointmentData.serialNumber || 'N/A'}
              </p>
            </div>
          </div>
          <button className="check-time-button" onClick={handleCheckTimeClick}>
            Check Your Time
          </button>
        </div>
      )}

      {showTimings && (
        <div className="timing-info">
          <div className="timing-item">
            <i className="icon-doctor">
              <img src={openclinic} alt="Clinic Opening" />
            </i>
            <p className="middlefont">Clinic Opening Time</p>
            <div className="timing-details">
              <p className="timing">
                <img src={clock} alt="clock" />{' '}
                {clinicOpeningTime ? formatTime(clinicOpeningTime) : 'Fetching...'}
              </p>
            </div>
          </div>
          <div className="timing-item">
            <div className="icon-doctor">
              <img src={doctorarrive} alt="Doctor Arrival" />
            </div>
            <p className="middlefont">Doctor Arrival Time</p>
            <div className="timing-details">
              <p className="delayed-time timing">
                <img src={clock} alt="clock" />{' '}
                {doctorArrivalTime ? formatTime(doctorArrivalTime) : 'Fetching...'}
              </p>
            </div>
          </div>
          <div className="timing-item">
            <i className="icon-patient">
              <img src={patiententer2} alt="Patient Exit" />
            </i>
            <p className="middlefont">
              Patient Number {appointmentData.serialNumber} Exit
            </p>
            <div className="timing-details">
              <p className="nth-patient-time">
                <img src={clock} alt="clock" />{' '}
                {predictedExitTime ? formatTime(predictedExitTime) : 'Fetching...'}
              </p>
            </div>
          </div>
          <div className="timing-item">
            <i className="icon-your-time">
              <img src={patiententer1} alt="Your Time" />
            </i>
            <p className="middlefont">Your Time</p>
            <div className="timing-details">
              <p className="your-time">
                {predictedExitTime ? formatTime(predictedExitTime) : 'Fetching...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TrackAppointment };
