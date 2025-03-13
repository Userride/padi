import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function DoctorAppointment() {
  const [patientLists, setPatientLists] = useState({
    '9Am-11Am': [],
    '2pm-4pm': [],
    '7pm-9pm': []
  });
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedTime, setPredictedTime] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    parentName: '',
    dateOfBirth: '',
    dateofappointment: '',
    age: '',
    gender: '',
    address: '',
    slot: '',
    recentlyVisited: '',
    visitCount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Predefined symptoms list (all in lowercase)
  const symptomsList = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue',
    'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
    'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration',
    'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
    'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
    'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
    'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
    'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness',
    'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
    'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes',
    'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
    'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples',
    'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze',
    'vertigo_paroxysmal_positional_vertigo'
  ];

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('selectedDoctorName');
    if (storedDoctorName) {
      fetchDoctorDetails(storedDoctorName);
    }

    setLoading(true);
    axios.get('https://paediprime-4chb.onrender.com/api/patients2')
      .then(response => {
        const groupedPatients = response.data.reduce((acc, patient) => {
          acc[patient.slot] = [...(acc[patient.slot] || []), patient];
          return acc;
        }, {});
        setPatientLists(groupedPatients);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchDoctorDetails = (doctorName) => {
    axios.get(`https://paediprime-4chb.onrender.com/api/doctor-details?name=${encodeURIComponent(doctorName)}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setError('Error fetching doctor details.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'visitCount') {
      const numValue = parseInt(value);
      setPatientDetails(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? '' : numValue
      }));
    } else {
      setPatientDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (name === 'dateOfBirth') {
      const calculatedAge = calculateAge(value);
      setPatientDetails({
        ...patientDetails,
        dateOfBirth: value,
        age: calculatedAge
      });
    }
  };

  // Calculate age in years
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years.toString();
  };

  const validateSymptoms = (symptoms) => {
    return symptoms && symptoms.length > 0 && symptoms.every(symptom => symptom.trim() !== '');
  };

  const validateForm = () => {
    try {
      const ageInYears = parseInt(patientDetails.age);
      if (isNaN(ageInYears) || ageInYears < 0) {
        alert('Please enter a valid age');
        return false;
      }

      if (!['male', 'female'].includes(patientDetails.gender.toLowerCase())) {
        alert('Please select a valid gender (Male or Female)');
        return false;
      }

      if (!validateSymptoms(selectedSymptoms)) {
        alert('Please select or add at least one symptom');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Validation Error:', error);
      alert('Error validating form data. Please check all fields.');
      return false;
    }
  };

  const getPredictionFromML = async (patientDetails, selectedSymptoms) => {
    let ageInYears, visitNumber;
    try {
      ageInYears = Math.round(parseInt(patientDetails.age));
      visitNumber = 1;
      if (patientDetails.recentlyVisited === 'yes' && patientDetails.visitCount) {
        visitNumber = parseInt(patientDetails.visitCount);
        if (isNaN(visitNumber)) visitNumber = 1;
      }

      const allSymptoms = {};
      symptomsList.forEach(symptom => {
        allSymptoms[symptom] = 0;
      });

      selectedSymptoms.forEach(symptom => {
        allSymptoms[symptom.toLowerCase()] = 1;
      });

      const requestData = {
        visitNumber: visitNumber,
        patientAge: ageInYears,
        patientSex: patientDetails.gender.toLowerCase() === 'male' ? 1 : 2,
        symptoms: allSymptoms
      };

      console.log('Sending exact prediction request:', JSON.stringify(requestData, null, 2));

      const response = await axios.post(
        'https://paediprimetime.onrender.com/predict_disease_and_time',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Response received:', response.data);

      if (!response.data || !response.data["Predicted Time Taken (seconds)"]) {
        throw new Error('Invalid response from prediction service');
      }

      return response.data["Predicted Time Taken (seconds)"];
    } catch (error) {
      console.error('Detailed ML Prediction Error:', {
        error: error,
        message: error.message,
        response: error.response?.data,
        requestData: error.config?.data
      });
      if (error.response?.status === 500) {
        throw new Error('The prediction service encountered an error. Please try with different symptoms.');
      } else {
        throw new Error('Unable to predict consultation time. Please try again.');
      }
    }
  };

  const convertTimeToSlot = (timeInSeconds) => {
    if (timeInSeconds <= 300) {
      return '9Am-11Am';
    } else if (timeInSeconds <= 600) {
      return '2pm-4pm';
    } else {
      return '7pm-9pm';
    }
  };
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
    setError('');
  
    try {
      // 🔹 Predict consultation time using ML model
      const predictedTimeInSeconds = await getPredictionFromML(patientDetails, selectedSymptoms);
      setPredictedTime(predictedTimeInSeconds);
      if (!predictedTimeInSeconds) throw new Error('Invalid prediction result');
  
      const suggestedSlot = convertTimeToSlot(predictedTimeInSeconds);
  
      // 🔹 Create a local updated object that includes the computed slot
      const updatedPatientDetails = { ...patientDetails, slot: suggestedSlot };
  
      // 🔹 Create appointment using the updated details
      const response = await axios.post('https://paediprime-4chb.onrender.com/api/patients', {
        ...updatedPatientDetails,
        doctorname: doctor.name,
        clinicLocation: doctor.location,
        symptoms: selectedSymptoms,
        predictedConsultationTime: predictedTimeInSeconds
      });
  
      alert(`Appointment booked successfully! Appointment number: ${response.data.appointmentNumber}`);
  
      const createdPatient = response.data; // ✅ Get created patient data with serialNumber
  
      // 🔹 Construct payload for time prediction using local values and doctor info
      const timePredictionPayload = {
        patientAge: parseInt(patientDetails.age) || null, // Ensure it is a number
        estimatedConsultationDuration: `${Math.floor(predictedTimeInSeconds / 60)} minutes ${predictedTimeInSeconds % 60} seconds`,
        recommendedSlot: suggestedSlot || "Unknown",
        slot: createdPatient.slot || suggestedSlot,
        dateofappointment: createdPatient.dateofappointment || patientDetails.dateofappointment,
        serialNumber: createdPatient.serialNumber || null, // Ensure serialNumber is not undefined
        doctorname: doctor.name || "Unknown",
        clinicLocation: doctor.location || "Unknown"
      };
  
      console.log(" Time Prediction Payload being sent:", timePredictionPayload);
      
  
      // 🔹 Post the time prediction payload
      try {
        const timePredictionResponse = await axios.post(
          'http://localhost:5000/api/time-prediction',
          timePredictionPayload,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(" Time Prediction saved:", timePredictionResponse.data);
      } catch (error) {
        console.error(" Error saving time prediction:", error.response ? error.response.data : error.message);
        setError("Failed to store time prediction. Please try again.");
      }
  
      // 🔹 Clear form and selected symptoms after successful appointment
      setPatientDetails({
        patientName: '',
        parentName: '',
        dateOfBirth: '',
        dateofappointment: '',
        age: '',
        gender: '',
        address: '',
        slot: '',
        recentlyVisited: '',
        visitCount: ''
      });
      setSelectedSymptoms([]);
    } catch (error) {
      console.error(' Error details:', error);
      setError('Unable to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSymptomSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = symptomsList.filter(symptom =>
      symptom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSymptoms(filtered);
  };

  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => prev.filter(item => item !== symptom));
    } else {
      setSelectedSymptoms(prev => [...prev, symptom]);
    }
  };

  const formatSymptomForDisplay = (symptom) => {
    return symptom
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderPredictionInfo = () => {
    if (predictedTime === null) return null;
    const minutes = Math.floor(predictedTime / 60);
    const seconds = Math.round(predictedTime % 60);
    const ageInYears = patientDetails.age;
    return (
      <div className="prediction-info">
        <h4>Consultation Time Prediction</h4>
        <p>Patient Age: {ageInYears} {ageInYears === "1" ? "year" : "years"}</p>
        <p>Estimated consultation duration: {minutes} minutes {seconds} seconds</p>
        <p>Recommended slot: {convertTimeToSlot(predictedTime)}</p>
      </div>
    );
  };

  const clearPatientLists = () => {
    setPatientLists({
      '9Am-11Am': [],
      '2pm-4pm': [],
      '7pm-9pm': []
    });
  };

  useEffect(() => {
    console.log("Predicted Time:", predictedTime);
  }, [predictedTime]);

  return (
    <div className="doctor-appointment-container">
      <div className="middle-section">
        <div className="doctor-de">
          <h1 id="a" className='hd'>Doctor Information</h1>
          {doctor ? (
            <>
              <img src={doctor.image} alt="doctor" />
              <p>
                <strong>Name:</strong> {doctor.name}<br />
                <strong>Specialty:</strong> {doctor.specialty}<br />
                <strong>Clinic Time:</strong> {doctor.clinicTime}<br />
                <strong>Location:</strong> {doctor.location}<br />
                <strong>Consultation Fees(₹):</strong> {doctor.consultationFees} (may vary)<br />
                <strong>Contact:</strong><br />
                Phone: {doctor.contact?.phone}<br />
                Email: {doctor.contact?.email}<br />
                <strong>About Dr. {doctor.name}:</strong> {doctor.about}<br />
              </p>
            </>
          ) : (
            <p>Loading doctor information...</p>
          )}
        </div>
      </div>

      <div className="middle-section">
        <div className="book-appointment2">
          <div className="appointment-details2">
            <h2 id="f2">Book Appointment with Dr. {doctor?.name}</h2>
            <form onSubmit={handleSubmitAppointment}>
              {error && <p className="error">{error}</p>}
              {renderPredictionInfo()}
              <div className="form-group">
                <label> Patient's name:</label>
                <input type="text" name="patientName" value={patientDetails.patientName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Parent's Name:</label>
                <input type="text" name="parentName" value={patientDetails.parentName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Date of Appointment:</label>
                <input type="date" name="dateofappointment" value={patientDetails.dateofappointment} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Slot:</label>
                <select name="slot" value={patientDetails.slot} onChange={handleInputChange}>
                  <option value="">Choose your slot</option>
                  <option value="9Am-11Am">9Am-11Am</option>
                  <option value="2pm-4pm">2pm-4pm</option>
                  <option value="7pm-9pm">7pm-9pm</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={patientDetails.dateOfBirth} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Age (Years):</label>
                <input type="text" name="age" value={patientDetails.age} readOnly />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={patientDetails.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={patientDetails.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Select Symptoms:</label>
                <input
                  type="text"
                  placeholder="Search or type new symptom"
                  value={searchTerm}
                  onChange={handleSymptomSearch}
                />
                {searchTerm && (
                  <ul className="symptom-list">
                    {filteredSymptoms.length > 0 && filteredSymptoms.map((symptom, index) => (
                      <li key={index} onClick={() => handleSymptomSelect(symptom)}>
                        {formatSymptomForDisplay(symptom)} {selectedSymptoms.includes(symptom) && <span>(Selected)</span>}
                      </li>
                    ))}
                    {(!filteredSymptoms.length || !symptomsList.includes(searchTerm.toLowerCase())) && (
                      <li onClick={() => handleSymptomSelect(searchTerm)}>
                        Add new symptom: {formatSymptomForDisplay(searchTerm)}
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <div className="form-group">
                <label>Have you recently visited us with these same symptoms?</label><br />
                <label>
                  <input type="radio" name="recentlyVisited" value="yes"
                    checked={patientDetails.recentlyVisited === 'yes'}
                    onChange={handleInputChange} /> Yes
                </label>
                <label>
                  <input type="radio" name="recentlyVisited" value="no"
                    checked={patientDetails.recentlyVisited === 'no'}
                    onChange={handleInputChange} /> No
                </label>
              </div>
              {patientDetails.recentlyVisited === 'yes' && (
                <div className="form-group">
                  <label>How many times did you visit us recently with these same symptoms before this visit?</label>
                  <input type="number" name="visitCount" min="1"
                    value={patientDetails.visitCount} onChange={handleInputChange} />
                </div>
              )}
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="patient-list">
        <h2 id="f">Booking Information</h2>
        <div className="slot-list">
          {['9Am-11Am', '2pm-4pm', '7pm-9pm'].map((slot) => (
            <div key={slot} className="slot">
              <h3>{slot}</h3>
              <ul>
                {patientLists[slot].map((patient, index) => (
                  <li key={index}>
                    <strong>{patient.patientName}</strong><br />
                    Parent: {patient.parentName}<br />
                    Age: {patient.age} years<br />
                    Gender: {patient.gender}<br />
                    Date of Appointment: {patient.dateofappointment}<br />
                    Symptoms: {patient.symptoms ? patient.symptoms.join(', ') : 'N/A'}<br />
                    Predicted Consultation Time: {patient.predictedConsultationTime} seconds<br />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="clear-btn" onClick={clearPatientLists}>Clear Booking Information</button>
      </div>
    </div>
  );
}

const styles = `
  .prediction-info {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
  }
  .prediction-info h4 {
    margin-top: 0;
    color: #495057;
  }
  .prediction-info p {
    margin: 5px 0;
    color: #6c757d;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export { DoctorAppointment };
