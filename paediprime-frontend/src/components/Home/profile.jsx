import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './profile.css';
import img from './images/amits-baby.jpeg';
import { BmiGraph } from './bmi';
import { Link, useNavigate } from 'react-router-dom';

const PatientProfile = ({ initialData }) => {
  const [showBmiGraph, setShowBmiGraph] = useState(false);
  const [appointmentData, setAppointmentData] = useState(initialData);
  const [prescriptions, setPrescriptions] = useState([]);
  const [sameNamePatients, setSameNamePatients] = useState([]);
  const navigate = useNavigate();
  const patientName = localStorage.getItem('patientName');

  const handleBmiClick = () => setShowBmiGraph((prev) => !prev);

  const fetchPatientsWithSameName = async () => {
    try {
      // Fetch logged-in user details
      const userResponse = await fetch('https://paediprime-4chb.onrender.com/api/users');
      if (!userResponse.ok) {
        console.error('Failed to fetch logged-in user details, status:', userResponse.status);
        return;
      }
      const loggedInUser = await userResponse.json();
      console.log('Logged-in User:', loggedInUser); // Debug log
      const loggedInPatientName = loggedInUser?.patientName;
      const loggedInParentName = loggedInUser?.parentName;
  
      // Fetch patients with the same name
      const response = await fetch(`https://paediprime-4chb.onrender.com/api/patients/name/${patientName}`);
      if (response.ok) {
        const patientsWithSameName = await response.json();
        console.log('Patients with Same Name:', patientsWithSameName); // Debug log
  
        // Find the latest patient matching the logged-in patient's name and parent's name
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
          console.warn('No matching patient found for the logged-in user.');
        }
      } else {
        console.error('Failed to fetch patients with the same name, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching patients with the same name:', error);
    }
  };
  
  
  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`https://paediprime-4chb.onrender.com/api/prescription/name/${patientName}`);
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error('Failed to fetch prescriptions, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  useEffect(() => {
    fetchPatientsWithSameName();
    fetchPrescriptions();
  }, []);

  const handleViewPrescription = (prescriptionDate) => {
    localStorage.setItem('prescriptionDate', prescriptionDate);
    navigate('/prescription');
  };

  return (
    <div>
      <h1 className="doctorh1">Your Treatment Information</h1>
      <div className="patient-profile">
        <div className="left-side-patient">
          <div className="patient-info">
            <h1 id="p" className="hd">Patient Profile</h1>
            <img 
              src={appointmentData?.image || img} 
              alt={`${appointmentData?.patientName || 'Patient'}'s profile`} 
              className="patient-image" 
            />
            <h3 id="q">{patientName}</h3>
            {appointmentData ? (
              <>
                <p><span>Parent's Name: </span>{appointmentData.parentName}</p>
                <p><span>Age: </span>{appointmentData.age}</p>
                <p><span>Sex: </span>{appointmentData.gender}</p>
                <p><span>Appointment ID: </span>{appointmentData.appointmentNumber}</p>
                <p><span>Last Appointment Date: </span>{new Date(appointmentData.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <p>No matching patient details available.</p>
            )}
          </div>
        </div>
        <div className="right-side-patient">
          <h2 id="r" className="hd">Additional Information</h2>
          <div className="card-container-profile">
            <div className="card">
              <div className="metric">Weight</div>
              <div>{prescriptions?.weight || 0} kg</div>
            </div>
            <div className="card">
              <div onClick={handleBmiClick} className="clickable metric">BMI</div>
              <div>{prescriptions?.bmi || 0} kg/m<sup>2</sup></div>
            </div>
            <div className="card">
              <div className="metric">Pulse</div>
              <div>{prescriptions?.pulse || 0} bpm</div>
            </div>
            <div className="card">
              <div className="metric">Height</div>
              <div>{prescriptions?.height || 0} cm</div>
            </div>
            <div className="card">
              <div className="metric">Respiratory Rate</div>
              <div>{prescriptions?.respiratoryRate || 0} breaths/min</div>
            </div>
            <div className="card">
              <div className="metric">Oxygen Rate</div>
              <div>{prescriptions?.oxygenSaturation || 0} %</div>
            </div>
          </div>
          {showBmiGraph && <BmiGraph />}
          <a href="/Immunisation" className="view-profile-btn">Immunisation Analysis</a>
          <Link to="/appointments">
            <button id="btn" type="button">View Your Prescription</button>
          </Link>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div key={index} className="view-prescription-container">
                <div className="element date">{new Date(prescription.createdAt).toLocaleDateString()}</div>
                <div className="element name">Dr. {prescription.doctorName || 'Unknown'}</div>
                <button
                  onClick={() => handleViewPrescription(prescription.createdAt)}
                  className="element view"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p>No prescriptions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

PatientProfile.propTypes = {
  initialData: PropTypes.shape({
    patientName: PropTypes.string,
    parentName: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    appointmentNumber: PropTypes.string,
    createdAt: PropTypes.string,
    weight: PropTypes.number,
    bmi: PropTypes.number,
    pulse: PropTypes.number,
    height: PropTypes.number,
    respiratoryRate: PropTypes.number,
    oxygenSaturation: PropTypes.number,
    image: PropTypes.string,
  }),
};

PatientProfile.defaultProps = {
  initialData: {
    image: img,
  },
};

export default PatientProfile;
