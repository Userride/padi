
import React, { useEffect, useState } from 'react';
import './prescription.css';
import img from './images/logo.jpg';

function Prescription() {
  const [prescriptionDataMap, setPrescriptionDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const patientName = localStorage.getItem('patientName');
    const prescriptionDate = localStorage.getItem('prescriptionDate');

    if (!patientName || !prescriptionDate) {
      setError('Patient name or prescription date not found in localStorage');
      setLoading(false);
      return;
    }

    fetchPrescriptions(patientName, prescriptionDate);
  }, []);

  const fetchPrescriptions = (patientName, date) => {
    fetch(`https://paediprime-4chb.onrender.com/api/prescription/name/${patientName}/date/${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const prescriptionsMap = {};
          data.forEach(prescription => {
            prescriptionsMap[prescription.createdAt] = prescription;
          });
          setPrescriptionDataMap(prescriptionsMap);
        } else {
          setError('No prescriptions found for this patient on this date');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const prescriptionDate = localStorage.getItem('prescriptionDate');
  const prescription = prescriptionDataMap[prescriptionDate] || {};

  return (
    <div className="container-prescription">
      <div className="header-prescription">
        <div className="header-middle">
          <img src={img} alt="Logo" className="header-logo" />
        </div>
        <div className="header-right">
          <h2 className="header-name">Dr.Soumyadeep Pal</h2>
          <p>MBBS</p>

          <p>SSKM Ex Consultant</p>
          <p>Ph: +91-6294221627</p>
          <p>sekekamapal@gmail.com</p>
        </div>
      </div>
      <div className="patient-information-prescription">
        <h1 id="heading">Patient's Personal Information:</h1>
        <div className="info-container-prescription">
          <div className="info-row-prescription">
            <div className="info-group-prescription">
              <label>Patient's Name:</label>
              <span>{prescription.name || 'N/A'}</span>
            </div>
            <div className="info-group-prescription">
              <label>Patient's Gender:</label>
              <span>{prescription.sex || 'N/A'}</span>
            </div>
            <div className="info-group-prescription">
              <label>Patient's Age:</label>
              <span>{prescription.age ? `${prescription.age.years} years ${prescription.age.months} months` : 'N/A'}</span>
            </div>
          </div>
          <div className="info-row-prescription">
            <div className="info-group-prescription">
              <label>Date of Current Visit:</label>
              <span>
                {prescription.present_visit
                  ? new Date(prescription.present_visit).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
            <div className="info-group-prescription">
              <label>Phone Number:</label>
              <span>{prescription.phone_number || 'N/A'}</span>
            </div>
            <div className="info-group-prescription">
              <label>Date of First Visit:</label>
              <span>
                {prescription.last_visit
                  ? new Date(prescription.last_visit).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>
          <div className="info-row-prescription">
            <div className="info-group-prescription">
              <label>Email:</label>
              <span>{prescription.email_address || 'N/A'}</span>
            </div>
            <div className="info-group-prescription">
              <label>Number of Follow Ups:</label>
              <span>{prescription.visit_number || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-part-prescription">
        <div className="left-section-prescription">
          <div className="examination-info">
            <h1 id="heading">General Examination:</h1>
            <div className="info-container">
              <div className="info-group">
                <label>Height:</label>
                <span>{prescription.height || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Weight:</label>
                <span>{prescription.weight || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>BMI:</label>
                <span>{prescription.bmi || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Heart Rate:</label>
                <span>{prescription.heart_rate || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Respiratory Rate:</label>
                <span>{prescription.respiratory_rate || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Oxygen Saturation:</label>
                <span>{prescription.oxygen_saturation || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Capillary Blood Sugar:</label>
                <span>{prescription.capillary_blood_sugar || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Blood Glucose Level:</label>
                <span>{prescription.blood_sugar || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Blood Pressure (Systolic):</label>
                <span>{prescription.bp_systolic || 'N/A'}</span>
              </div>
              <div className="info-group">
                <label>Blood Pressure (Diastolic):</label>
                <span>{prescription.bp_diastolic || 'N/A'}</span>
              </div>
            </div>
          </div>
          <p id="p">Prognosis: Good recovery expected with prescribed medication.</p>
        </div>
        <div className="right-section-prescription">
          <h1 id="heading">C/O</h1>
          <div className="additional-info">
            <label>Chief Complaint:</label>
            <p>{prescription.chief_complain || 'N/A'}</p>
          </div>
          <div className="additional-info">
            <label>Significant Medical History:</label>
            <p>{prescription.medical_history || 'N/A'}</p>
          </div>
          <div className="additional-info">
            <label>Other Findings:</label>
            <p>{prescription.other_findings || 'N/A'}</p>
          </div>
          <h1 id="heading">Diagnosis</h1>
          <div className="additional-info">
            <label>Provisional Diagnosis:</label>
            <p>{prescription.provisional_diagnosis || 'N/A'}</p>
          </div>
          <div className="additional-info">
            <label>Confirmation Tests for Final Diagnosis:</label>
            <p>{prescription.confirmation_tests || 'N/A'}</p>
          </div>
          <div className="additional-info">
            <label>Final Diagnosis:</label>
            <p>{prescription.final_diagnosis || 'N/A'}</p>
          </div>
          <h1 id="heading">Rx.</h1>
          <div className="medicine-boxes">
            {prescription.medications && prescription.medications.length > 0 ? (
              prescription.medications.map((medicine, index) => (
                <div key={index} className="medicine-box">
                  <li>
                    {medicine.name} - {medicine.dosage} mg, {medicine.frequency}
                    ({medicine.time_of_administration}), Route: {medicine.route},
                    Duration: {medicine.duration}
                  </li>
                  {medicine.special_instructions && (
                    <p>Instructions: {medicine.special_instructions}</p>
                  )}
                  {medicine.precautions && (
                    <p>Precautions: {medicine.precautions}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No medications found.</p>
            )}
          </div >
          <div className="signature"> Signature
            <p>{prescription.signature || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
