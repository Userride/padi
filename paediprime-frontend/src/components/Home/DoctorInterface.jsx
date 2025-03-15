import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app2.css'; // Ensure your styles are in this file
import { NavLink } from "react-router-dom";



const medications = [
  { name: "Acarbose", dosage: "50-100", amount: 30, frequency: "TDS", time_of_administration: "PC", route: "Oral" },
  { name: "Aminolevulinic acid", dosage: "20-40", amount: 15, frequency: "OD", time_of_administration: "AC", route: "Topical" },
  { name: "Anagrelide", dosage: "0.5-1", amount: 60, frequency: "BD", time_of_administration: "HS", route: "Oral" },
  { name: "Benzophenone", dosage: "200-400", amount: 10, frequency: "Once", time_of_administration: "PRN", route: "Topical" },
  { name: "Bosentan", dosage: "62.5", amount: 120, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Brimonidine", dosage: "0.1-0.2%", amount: 10, frequency: "TDS", time_of_administration: "Anytime", route: "Ophthalmic" },
  { name: "Cabazitaxel", dosage: "25", amount: 1, frequency: "Every 3 weeks", time_of_administration: "IV", route: "Intravenous" },
  { name: "Carbamazepine", dosage: "200-400", amount: 30, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Carboplatin", dosage: "300-450", amount: 1, frequency: "Once", time_of_administration: "IV", route: "Intravenous" },
  { name: "Carprofen", dosage: "4-5 mg/kg", amount: 10, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Crizotinib", dosage: "250", amount: 60, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Cyamemazine", dosage: "25-50", amount: 90, frequency: "TDS", time_of_administration: "AC", route: "Oral" },
  { name: "Cyclophosphamide", dosage: "500-1000", amount: 1, frequency: "Monthly", time_of_administration: "IV", route: "Intravenous" },
  { name: "Dienogest", dosage: "2", amount: 28, frequency: "OD", time_of_administration: "Anytime", route: "Oral" },
  { name: "Digoxin", dosage: "0.125-0.25", amount: 30, frequency: "OD", time_of_administration: "PC", route: "Oral" },
  { name: "Docetaxel", dosage: "75-100", amount: 1, frequency: "Every 3 weeks", time_of_administration: "IV", route: "Intravenous" },
  { name: "Edoxaban", dosage: "60", amount: 30, frequency: "OD", time_of_administration: "PC", route: "Oral" },
  { name: "Etacrynic acid", dosage: "50-200", amount: 15, frequency: "OD", time_of_administration: "AM", route: "Oral" },
  { name: "Fosphenytoin", dosage: "100-150", amount: 3, frequency: "Every 12 hours", time_of_administration: "IV", route: "Intravenous" },
  { name: "Hexaminolevulinate", dosage: "100", amount: 1, frequency: "Once", time_of_administration: "Before procedure", route: "Intravesical" },
  { name: "Imatinib", dosage: "400", amount: 30, frequency: "OD", time_of_administration: "PC", route: "Oral" },
  { name: "Lanreotide", dosage: "60", amount: 1, frequency: "Every 28 days", time_of_administration: "SC", route: "Subcutaneous" },
  { name: "Lumacaftor", dosage: "200", amount: 56, frequency: "BD", time_of_administration: "AC", route: "Oral" },
  { name: "Methoxsalen", dosage: "25", amount: 10, frequency: "OD", time_of_administration: "AM", route: "Oral" },
  { name: "Midostaurin", dosage: "50", amount: 30, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Mitotane", dosage: "500-1000", amount: 30, frequency: "OD", time_of_administration: "Anytime", route: "Oral" },
  { name: "Nevirapine", dosage: "200", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Olaparib", dosage: "300", amount: 30, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Paclitaxel", dosage: "175", amount: 1, frequency: "Every 3 weeks", time_of_administration: "IV", route: "Intravenous" },
  { name: "Pentobarbital", dosage: "50", amount: 1, frequency: "Once", time_of_administration: "IV", route: "Intravenous" },
  { name: "Phenobarbital", dosage: "50-100", amount: 30, frequency: "OD", time_of_administration: "PC", route: "Oral" },
  { name: "Phenytoin", dosage: "100", amount: 30, frequency: "BD", time_of_administration: "AC", route: "Oral" },
  { name: "Pirlindole", dosage: "50", amount: 30, frequency: "OD", time_of_administration: "Anytime", route: "Oral" },
  { name: "Prednisolone", dosage: "5-10", amount: 30, frequency: "OD", time_of_administration: "AM", route: "Oral" },
  { name: "Primidone", dosage: "50", amount: 30, frequency: "OD", time_of_administration: "PC", route: "Oral" },
  { name: "Procarbazine", dosage: "50", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Quinapril", dosage: "10", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Riboflavin", dosage: "5", amount: 30, frequency: "OD", time_of_administration: "AM", route: "Oral" },
  { name: "Rifabutin", dosage: "150", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Rifampicin", dosage: "10", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Rifapentine", dosage: "10", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Rifaximin", dosage: "200", amount: 30, frequency: "TDS", time_of_administration: "PC", route: "Oral" },
  { name: "Rucaparib", dosage: "600", amount: 30, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Silodosin", dosage: "8", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Sulpiride", dosage: "50", amount: 30, frequency: "OD", time_of_administration: "Anytime", route: "Oral" },
  { name: "Sunitinib", dosage: "50", amount: 30, frequency: "OD", time_of_administration: "AC", route: "Oral" },
  { name: "Temoporfin", dosage: "0.1", amount: 1, frequency: "Once", time_of_administration: "PRN", route: "Topical" },
  { name: "Tiaprofenic acid", dosage: "100", amount: 30, frequency: "BD", time_of_administration: "PC", route: "Oral" },
  { name: "Titanium dioxide", dosage: "100", amount: 1, frequency: "Once", time_of_administration: "Before procedure", route: "Topical" },
  { name: "Trioxsalen", dosage: "10", amount: 10, frequency: "Once", time_of_administration: "Before procedure", route: "Topical" },
  { name: "Verteporfin", dosage: "6", amount: 1, frequency: "Once", time_of_administration: "IV", route: "Intravenous" }
];

function DoctorInterface() {
  const [patientNames, setPatientNames] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: { years: 0, months: 0 },
    sex: '',
    present_visit: '',
    last_visit: '',
    visit_number: '',
    appointment_id: '',    
    slot_no: '',        
    phone_number: '',
    email_address: '',
    medical_history: '',
    height: 0,
    weight: 0,
    bmi: 0,
    bp_systolic: 0,
    bp_diastolic: 0,
    heart_rate: 0,
    respiratory_rate: 0,
    oxygen_saturation: 0,
    blood_sugar: 0,
    chief_complain: '',
    other_findings: '',
    provisional_diagnosis: '',
    confirmation_tests: '',
    medications: [
      {
        type: '',
        name: '',
        dosage: '',
        amount: '',
        frequency: '',
        time_of_administration: '',
        duration: '',
        route: '',
        special_instructions: '',
        precautions: ''
      }
    ],
    prescription_duration: '',
    refills: 0,
    signature: ''
  });

  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

  useEffect(() => {
    const savedPatientNames = JSON.parse(localStorage.getItem('patientNames')) || [];
    setPatientNames(savedPatientNames);

    if (savedPatientNames.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        name: savedPatientNames[0]
      }));
    }
  }, []);

  const handleNextPatient = () => {
    if (currentPatientIndex < patientNames.length - 1) {
      const nextIndex = currentPatientIndex + 1;
      setCurrentPatientIndex(nextIndex);
      setFormData((prevData) => ({
        ...prevData,
        name: patientNames[nextIndex]
      }));
    }
  };
  const handlePreviousPatient = () => {
    if (currentPatientIndex > 0) {
      const prevIndex = currentPatientIndex - 1;
      setCurrentPatientIndex(prevIndex);
      setFormData((prevData) => ({
        ...prevData,
        name: patientNames[prevIndex]
      }));
    }
  };



  const handleCheckIn = async () => {
    try {
      const response = await axios.post('https://paediprime-4chb.onrender.com/api/doctor-times/check-in', { doctorId: 'doctor-id-here' });
      alert(`Check-in time recorded: ${new Date(response.data.checkInTime).toLocaleTimeString()}`);

      // Reset click count to 1 in localStorage
      localStorage.setItem('clickCount', '1');
      setClickCount(1); // Update state to reflect the change if needed
    } catch (error) {
      console.error('Error recording check-in time:', error);
    }
  };


  const handleCheckOut = async () => {
    try {
      const response = await axios.post('https://paediprime-4chb.onrender.com/api/doctor-times/check-out', { doctorId: 'doctor-id-here' });
      alert(`Check-out time recorded: ${new Date(response.data.checkOutTime).toLocaleTimeString()}`);
    } catch (error) {
      console.error('Error recording check-out time:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('age-')) {
      const ageField = name.split('-')[1];
      setFormData({
        ...formData,
        age: { ...formData.age, [ageField]: value }
      });
    } else {
      // Create a copy of the current form data with updated values
      const newFormData = {
        ...formData,
        [name]: value
      };

      // Calculate BMI when height/weight changes
      if (name === 'height' || name === 'weight') {
        const height = parseFloat(newFormData.height) || 0;
        const weight = parseFloat(newFormData.weight) || 0;

        if (height > 0 && weight > 0) {
          const heightInMeters = height / 100;
          const bmiValue = weight / (heightInMeters * heightInMeters);
          newFormData.bmi = parseFloat(bmiValue.toFixed(2)); // Round to 2 decimals
        } else {
          newFormData.bmi = 0; // Default to 0 if invalid inputs
        }
      }

      setFormData(newFormData);
    }
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = formData.medications.map((med, medIndex) => {
      if (index === medIndex) {
        return { ...med, [name]: value };
      }
      return med;
    });
    setFormData({ ...formData, medications: newMedications });
  };

  const handleMedicationChangeDict = (index, e) => {
    const { value } = e.target;
    const selectedMedication = medications.find((med) => med.name === value);

    const newMedications = [...formData.medications];
    newMedications[index] = {
      ...newMedications[index],
      name: selectedMedication?.name || value,
      dosage: selectedMedication?.dosage || '',
      amount: selectedMedication ? String(selectedMedication.amount * formData.weight) : '',
      frequency: selectedMedication?.frequency || '',
      time_of_administration: selectedMedication?.time_of_administration || '',
      route: selectedMedication?.route || '',
      // Add default values for other fields
      duration: selectedMedication?.duration || '',
      special_instructions: selectedMedication?.special_instructions || '',
      precautions: selectedMedication?.precautions || ''
    };

    const interaction = drugInteractions.find(
      (interaction) =>
        (interaction["Drug 1"] === value && newMedications.some((med) => med.name === interaction["Drug 2"])) ||
        (interaction["Drug 2"] === value && newMedications.some((med) => med.name === interaction["Drug 1"]))
    );

    if (interaction) {
      alert(`Interaction detected: ${interaction["Interaction Description"]}`);
    }

    setFormData({ ...formData, medications: newMedications });
  };



  const handleMedChange = (index, field, e) => {
    const { name, value } = e.target;
    const selectedMedication = medications.find(med => med.name === value);
    const newMedications = formData.medications.map((med, medIndex) => {
      if (index === medIndex && field == "Dosage") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          dosage: selectedMedication ? selectedMedication.dosage : value
          // amount: selectedMedication ? selectedMedication.amount : '',
          // frequency: selectedMedication ? selectedMedication.frequency : ''
        };
      }
      if (index === medIndex && field == "Amount") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          amount: selectedMedication ? (selectedMedication.amount) * (formData.weight) : value
          // frequency: selectedMedication ? selectedMedication.frequency : ''
        };
      }
      if (index === medIndex && field == "Frequency") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          frequency: selectedMedication ? selectedMedication.frequency : value
        };
      }
      if (index === medIndex && field == "TimeOfAdministration") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          // frequency: selectedMedication ? selectedMedication.frequency : value
          time_of_administration: selectedMedication ? selectedMedication.time_of_administration : value
          // route: selectedMedication ? selectedMedication.route: ''
        };
      }
      if (index === medIndex && field == "Route") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          // frequency: selectedMedication ? selectedMedication.frequency : value
          // time_of_administration: selectedMedication ? selectedMedication.time_of_administration: '',
          route: selectedMedication ? selectedMedication.route : value
        };
      }
      return med;
    });
    setFormData({ ...formData, medications: newMedications });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          type: '',
          name: '',
          dosage: '',
          amount: '',
          frequency: '',
          time_of_administration: '',
          duration: '',
          route: '',
          special_instructions: '',
          precautions: ''
        }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields
      const payload = {
        ...formData,
        medications: formData.medications.map(med => ({
          ...med,
          amount: String(med.amount) // Ensure string type
        }))
      };

      const response = await axios.post(
        'http://localhost:5000/api/prescription',
        payload
      );
      alert('Prescription saved successfully!');
      handleNextPatient();
    } catch (error) {
      console.error('Submission Error:', {
        error: error.response?.data,
        request: error.config?.data
      });
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
  const drugInteractions = [
    { "Drug 1": "Trioxsalen", "Drug 2": "Verteporfin", "Interaction Description": "Trioxsalen may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Aminolevulinic acid", "Drug 2": "Verteporfin", "Interaction Description": "Aminolevulinic acid may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Titanium dioxide", "Drug 2": "Verteporfin", "Interaction Description": "Titanium dioxide may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Tiaprofenic acid", "Drug 2": "Verteporfin", "Interaction Description": "Tiaprofenic acid may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Cyamemazine", "Drug 2": "Verteporfin", "Interaction Description": "Cyamemazine may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Temoporfin", "Drug 2": "Verteporfin", "Interaction Description": "Temoporfin may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Methoxsalen", "Drug 2": "Verteporfin", "Interaction Description": "Methoxsalen may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Hexaminolevulinate", "Drug 2": "Verteporfin", "Interaction Description": "Hexaminolevulinate may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Benzophenone", "Drug 2": "Verteporfin", "Interaction Description": "Benzophenone may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Riboflavin", "Drug 2": "Verteporfin", "Interaction Description": "Riboflavin may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Carprofen", "Drug 2": "Verteporfin", "Interaction Description": "Carprofen may increase the photosensitizing activities of Verteporfin." },
    { "Drug 1": "Cyclophosphamide", "Drug 2": "Verteporfin", "Interaction Description": "Cyclophosphamide may increase the cardiotoxic activities of Verteporfin." },
    { "Drug 1": "Paclitaxel", "Drug 2": "Verteporfin", "Interaction Description": "The risk or severity of adverse effects can be increased when Paclitaxel is combined with Verteporfin." },
    { "Drug 1": "Docetaxel", "Drug 2": "Verteporfin", "Interaction Description": "The risk or severity of adverse effects can be increased when Docetaxel is combined with Verteporfin." },
    { "Drug 1": "Cabazitaxel", "Drug 2": "Verteporfin", "Interaction Description": "The risk or severity of adverse effects can be increased when Cabazitaxel is combined with Verteporfin." },
    { "Drug 1": "Aminolevulinic acid", "Drug 2": "Digoxin", "Interaction Description": "Aminolevulinic acid may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Temoporfin", "Drug 2": "Digoxin", "Interaction Description": "Temoporfin may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Cyclophosphamide", "Drug 2": "Digoxin", "Interaction Description": "Cyclophosphamide may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Paclitaxel", "Drug 2": "Digoxin", "Interaction Description": "Paclitaxel may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Docetaxel", "Drug 2": "Digoxin", "Interaction Description": "Docetaxel may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Cabazitaxel", "Drug 2": "Digoxin", "Interaction Description": "Cabazitaxel may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Sulpiride", "Drug 2": "Digoxin", "Interaction Description": "The risk or severity of adverse effects can be increased when Sulpiride is combined with Digoxin." },
    { "Drug 1": "Rifabutin", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Rifabutin." },
    { "Drug 1": "Phenytoin", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Phenytoin." },
    { "Drug 1": "Rifampicin", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Rifampicin." },
    { "Drug 1": "Fosphenytoin", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Fosphenytoin." },
    { "Drug 1": "Carbamazepine", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Carbamazepine." },
    { "Drug 1": "Primidone", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Primidone." },
    { "Drug 1": "Phenobarbital", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Phenobarbital." },
    { "Drug 1": "Pentobarbital", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Pentobarbital." },
    { "Drug 1": "Nevirapine", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Nevirapine." },
    { "Drug 1": "Rifapentine", "Drug 2": "Digoxin", "Interaction Description": "The metabolism of Digoxin can be increased when combined with Rifapentine." },
    { "Drug 1": "Rifaximin", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be increased when it is combined with Rifaximin." },
    { "Drug 1": "Bosentan", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be decreased when it is combined with Bosentan." },
    { "Drug 1": "Lumacaftor", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be decreased when it is combined with Lumacaftor." },
    { "Drug 1": "Silodosin", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be increased when it is combined with Silodosin." },
    { "Drug 1": "Edoxaban", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be increased when it is combined with Edoxaban." },
    { "Drug 1": "Anagrelide", "Drug 2": "Digoxin", "Interaction Description": "Anagrelide may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Carboplatin", "Drug 2": "Digoxin", "Interaction Description": "Carboplatin may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Etacrynic acid", "Drug 2": "Digoxin", "Interaction Description": "The risk or severity of adverse effects can be increased when Etacrynic acid is combined with Digoxin." },
    { "Drug 1": "Pirlindole", "Drug 2": "Digoxin", "Interaction Description": "Pirlindole may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Procarbazine", "Drug 2": "Digoxin", "Interaction Description": "Procarbazine may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Acarbose", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be decreased when it is combined with Acarbose." },
    { "Drug 1": "Sunitinib", "Drug 2": "Digoxin", "Interaction Description": "Sunitinib may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Lanreotide", "Drug 2": "Digoxin", "Interaction Description": "Lanreotide may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Brimonidine", "Drug 2": "Digoxin", "Interaction Description": "Brimonidine may increase the bradycardic activities of Digoxin." },
    { "Drug 1": "Imatinib", "Drug 2": "Digoxin", "Interaction Description": "Imatinib may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Crizotinib", "Drug 2": "Digoxin", "Interaction Description": "Crizotinib may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Mitotane", "Drug 2": "Digoxin", "Interaction Description": "The serum concentration of Digoxin can be decreased when it is combined with Mitotane." },
    { "Drug 1": "Dienogest", "Drug 2": "Digoxin", "Interaction Description": "Dienogest may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Olaparib", "Drug 2": "Digoxin", "Interaction Description": "Olaparib may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Rucaparib", "Drug 2": "Digoxin", "Interaction Description": "Rucaparib may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Prednisolone", "Drug 2": "Digoxin", "Interaction Description": "Prednisolone may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Midostaurin", "Drug 2": "Digoxin", "Interaction Description": "Midostaurin may decrease the cardiotoxic activities of Digoxin." },
    { "Drug 1": "Quinapril", "Drug 2": "Digoxin", "Interaction Description": "Quinapril may decrease the cardiotoxic activities of Digoxin." }
  ];


  return (
    <div className="container">
      <div className='left-section'>
        <div className="header">
          <h1 className='hd'>DOCTOR'S INTERFACE</h1>
        </div>
        <div className="check-in-out">
          <button onClick={handleCheckIn} className="text-white bg-green-800 hover:bg-green-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Check In</button>
          <button onClick={handleCheckOut} className="text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Check Out</button>
          <NavLink to="/patient-list"><button className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Patient List</button></NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="prescription-container">
            <div className="left-side-prescription">
              <h2>Patient's Personal Information :</h2>
              <div className="form-container">
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="name">Patient's Name :</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="sex">Patient's Gender :</label>
                    <input type="text" id="sex" name="sex" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="age-years">Patient's Age :</label>
                    <input type="number" id="age-years" name="age-years" onChange={handleInputChange} />
                    <input type="number" id="age-months" name="age-months" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="present_visit">Date of Current Visit :</label>
                    <input type="date" id="present_visit" name="present_visit" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="phone_number">Ph. No. :</label>
                    <input type="text" id="phone_number" name="phone_number" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="last_visit">Date of First Visit :</label>
                    <input type="date" id="last_visit" name="last_visit" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="email_address">Email :</label>
                    <input type="email" id="email_address" name="email_address" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="visit_number">Number of Follow Ups :</label>
                    <input type="text" id="visit_number" name="visit_number" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="appointment_id">Appointment ID :</label>
                    <input type="text" id="appointment_id" name="appointment_id" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group2">
                    <label htmlFor="slot_no">Slot No:</label>
                    <input type="text" id="slot_no" name="slot_no" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <h2>Patient's Basic General Examination Information:</h2>
              <div className="form-container">
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor="height">Height(cm):</label>
                    <input type="number" id="height" name="height" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="weight">Weight(kg):</label>
                    <input type="number" id="weight" name="weight" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor="bmi">BMI:</label>
                    <input
                      type="number"
                      id="bmi"
                      name="bmi"
                      value={formData.bmi}
                      readOnly
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="heart_rate">Heart Rate:</label>
                    <input type="number" id="heart_rate" name="heart_rate" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor="respiratory_rate">Respiratory Rate:</label>
                    <input type="number" id="respiratory_rate" name="respiratory_rate" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="oxygen_saturation">Oxygen Saturation:</label>
                    <input type="number" id="oxygen_saturation" name="oxygen_saturation" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor="blood_sugar">Capillary Blood Sugar (using glucometer):</label>
                    <input type="number" id="blood_sugar" name="blood_sugar" onChange={handleInputChange} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor="bp_systolic">Systolic:</label>
                    <input type="number" id="bp_systolic" name="bp_systolic" onChange={handleInputChange} />
                  </div>

                </div>
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor="bp_diastolic">Diastolic:</label>
                    <input type="number" id="bp_diastolic" name="bp_diastolic" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <h2>Complain of (C/O): </h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="chief_complain">Chief Complain:</label>
                  <textarea id="chief_complain" name="chief_complain" rows="3" onChange={handleInputChange}></textarea>
                </div>
              </div>
              <h2>Any relevant other findings: </h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="other_findings">Other Findings:</label>
                  <textarea id="other_findings" name="other_findings" rows="3" onChange={handleInputChange}></textarea>
                </div>
              </div>
              <h2>Provisional Diagnosis (P/D):</h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="provisional_diagnosis">Provisional Diagnosis:</label>
                  <textarea id="provisional_diagnosis" name="provisional_diagnosis" rows="3" onChange={handleInputChange}></textarea>
                </div>
              </div>
              <h2>Tests for Confirmation:</h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="confirmation_tests">Tests:</label>
                  <textarea id="confirmation_tests" name="confirmation_tests" rows="3" onChange={handleInputChange}></textarea>
                </div>
              </div>
              <h2>Medications:</h2>
              {formData.medications.map((med, index) => (
                <div key={index} className="form-container">
                  <div className="form-group">
                    <div className="form-group2">
                      <label htmlFor={`med-type-${index}`}>Type:</label>
                      <input type="text" id={`med-type-${index}`} name="type" onChange={(e) => handleMedicationChange(index, e)} />
                    </div>
                    <div className="form-group2">
                      <label h tmlFor={`medication-name-${index}`}>Name:</label>
                      <input
                        list="medications-list"
                        type="text"
                        id={`medication-name-${index}`}
                        name={`medication-name-${index}`}
                        value={med.name}
                        onChange={(e) => handleMedicationChangeDict(index, e)}
                      />
                      <datalist id="medications-list">
                        {medications.map((medication) => (
                          <option key={medication.name} value={medication.name} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group2">
                      <label htmlFor={`medication-dosage-${index}`}>Dosage(mg/kg/day):</label>
                      <input
                        type="text"
                        id={`medication-dosage-${index}`}
                        name={`medication-dosage-${index}`}
                        value={med.dosage}
                        onChange={(e) => handleMedChange(index, "Dosage", e)}
                      />
                    </div>
                    <div className="form-group2">
                      <label htmlFor={`medication-amount-${index}`}>Amount(mg/day):</label>
                      <input
                        type="text"
                        id={`medication-amount-${index}`}
                        name={`medication-amount-${index}`}
                        value={med.amount}
                        onChange={(e) => handleMedChange(index, "Amount", e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group2">
                      <label htmlFor={`medication-frequency-${index}`}>Frequency:</label>
                      <input
                        type="text"
                        id={`medication-frequency-${index}`}
                        name={`medication-frequency-${index}`}
                        value={med.frequency}
                        onChange={(e) => handleMedChange(index, "Frequency", e)}
                      />
                    </div>
                    <div className="form-group2">
                      <label htmlFor={`medication-time-${index}`}>Time of Administration:</label>
                      <input
                        type="text"
                        id={`medication-time-${index}`}
                        name={`medication-time-${index}`}
                        value={med.time_of_administration}
                        onChange={(e) => handleMedChange(index, "TimeOfAdministration", e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group2">
                      <label htmlFor={`medication-duration-${index}`}>Duration:</label>
                      <input
                        type="text"
                        id={`medication-duration-${index}`}
                        name="duration"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </div>
                    <div className="form-group2">
                      <label htmlFor={`medication-route-${index}`}>Route:</label>
                      <input
                        type="text"
                        id={`medication-route-${index}`}
                        name="route"
                        value={med.route}
                        onChange={(e) => handleMedChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-group2">
                      <label htmlFor={`medication-special-${index}`}>Special Instructions:</label>
                      <input
                        type="text"
                        id={`medication-special-${index}`}
                        name="special_instructions"
                        value={med.special_instructions}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </div>
                    <div className="form-group2">
                      <label htmlFor={`medication-precautions-${index}`}>Precautions:</label>
                      <input
                        type="text"
                        id={`medication-precautions-${index}`}
                        name="precautions"
                        value={med.precautions}
                        onChange={(e) => handleMedicationChange(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addMedicine} className='add-medicine'> <i className='bx bx-plus-circle'></i> Add Medicine</button>
              <h2>Duration of prescription:</h2>
              <div className="form-container ">
                <div className="form-group2">
                  <label htmlFor="prescription_duration">Duration:</label>
                  <input type="text" id="prescription_duration" name="prescription_duration" onChange={handleInputChange} />
                </div>
              </div>
              <h2>Refill Information:</h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="refills">Number of Refills:</label>
                  <input type="number" id="refills" name="refills" onChange={handleInputChange} />
                </div>
              </div>
              <h2>Signature:</h2>
              <div className="form-container">
                <div className="form-group2">
                  <label htmlFor="signature">Signature:</label>
                  <input type="text" id="signature" name="signature" onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="save-prescription-button">Save Prescription</button>

        </form>
      </div>

    </div>
  );
}

export default DoctorInterface;
