import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Doctor.css";
import smsIcon from "./images/sma.webp"; 
import voiceCallIcon from "./images/phone.jpg"; 
import videoCallIcon from "./images/video.jpg";

function DoctorDetails() {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const doctorName = localStorage.getItem('doctorName');

    // Fetch doctor details using GET request
    if (doctorName) {
      axios.get(`https://paediprime-4chb.onrender.com/api/doctor-details?name=${doctorName}`)
        .then(response => {
          setDoctor(response.data);
        })
        .catch(error => {
          console.error("Error fetching doctor details:", error);
          setError('Error fetching doctor details');
        });
    } else {
      setError('No doctor selected');
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-appointment">
      <div className="top-section-doctor">
        <div className="doctor-details">
          <h1 className='doctorh1'>Doctor's Information</h1>
          <img id="dl" src={doctor.image} alt="doctor" />
          <strong>Name:</strong> {doctor.name} <br />
          <strong>Specialty:</strong> {doctor.specialty} <br />
          <strong>Consultation Fees:</strong> {doctor.consultationFees} Rs <br />
          <strong>About Dr. {doctor.name.split(' ')[1]}:</strong> {doctor.about} <br />
        </div>
        <div className="communication-icons">
          <h1 className='doctorh1'>Communication</h1>
          <div className="communication-options">
            <div className="communication-option">
              <img src={smsIcon} alt="SMS" />
              <p>SMS</p>
              <p>+91 94776 31753</p>
            </div>
            <div className="communication-option">
              <img src={voiceCallIcon} alt="Voice Call" />
              <p>Voice Call</p>
              <p>+91 94776 31753</p>
            </div>
            <div className="communication-option">
              <img src={videoCallIcon} alt="Video Call" />
              <p>Video Call</p>
              <p>+91 94776 31753</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-section-doctor">
        <div className="clinic-info">
          <h1 className='doctorh1'>Clinic Information</h1>
          <div className="clinic1">
            <h3>Clinic 1</h3>
            <p id="u">
              <strong>Clinic’s Location 1:</strong> {doctor.location} <br />
              <strong>Clinic’s Time:</strong> {doctor.clinicTime} <br />
              <strong>Consultation Fees:</strong> {doctor.consultationFees} Rs <br />
            </p>
          </div>
          {/* Add more clinic information if needed */}
        </div>
      </div>
      <div />
    </div>
  );
}

export { DoctorDetails };