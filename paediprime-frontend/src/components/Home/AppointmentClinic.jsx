import React, { useState, useEffect } from 'react';
import './clinicApp.css';
import { Link, useNavigate } from 'react-router-dom';
import { Map } from "./clinic.jsx";
import axios from 'axios';

import img1 from "./images/img1.avif";
import gallary1 from "./images/gallary1.jpg";
import gallary2 from "./images/gallary2.jpg";
import gallary3 from "./images/gallary3.jpg";

function ClinicAppointment() {
  const [clinicName, setClinicName] = useState('');
  const [clinicLocation, setClinicLocation] = useState('');
  const [clinicTime, setClinicTime] = useState('');
  const [clinicAbout, setClinicAbout] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    fathersName: '',
    mothersName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //location ka name local storage se match ho jaye ga to remaining data api/clinic-details yaha se aayega
  useEffect(() => {
    const storedClinicLocation = localStorage.getItem('selectedClinicLocation');
    if (storedClinicLocation) {
      axios.post("https://paediprime-4chb.onrender.com/api/clinic-details", { location: storedClinicLocation })
        .then(response => {
          console.log(response.data);
          const { name, location, clinicTime, about } = response.data;
          setClinicName(name);
          setClinicLocation(location);
          setClinicTime(clinicTime);
          setClinicAbout(about);
        })
        .catch(error => {
          console.error("Error fetching clinic details:", error);
          setError('Error fetching clinic details');
        });
    } else {
      setError('No clinic selected');
    }

    // Fetching doctor data
    axios.post('https://paediprime-4chb.onrender.com/api/doctordata4')
      .then(response => {
        setDoctorList(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
        setError('Error fetching doctor data');
      });
  }, []);

  const handleBookAppointment = (doctorName) => {
    if (!localStorage.getItem('authToken')) {
      navigate('/loginuser');
    } else {
      localStorage.setItem('selectedDoctorName', doctorName);
      navigate('/appointment');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentNumber = Math.floor(Math.random() * 1000000);
    const dataToSubmit = {
      ...patientDetails,
      appointmentNumber: appointmentNumber
    };
    console.log(dataToSubmit);

    setPatientDetails({
      name: '',
      fathersName: '',
      mothersName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      address: ''
    });
  };
  const buyFunction = async () => {
    try {
      const response = await axios.post('https://paediprime-4chb.onrender.com/api/payment');
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="clinic-appointment-container">
      <div className='middle-section'>
        <h1 className='hd'>Clinic Information</h1>
        <div className="clinic-info">
          <>
            <h2 id='a' className='clinic-name'>{clinicName}</h2>
            <img src={img1} alt={clinicName} className='img' />
            <p><span>Location:</span> {clinicLocation}</p>
            <p><span>Clinic Time:</span> {clinicTime}</p>
            <p><span>Mode:</span> online-booking, SMS</p>
            <h2 id="c" className='clinic-name'>About Clinic</h2>
            <p>{clinicAbout}</p>
          </>
        </div>
        <h1 id="a" className='hd'>Gallery</h1>
        <div className='images'>
          <img src={gallary1} alt="Gallery 1" id="i" />
          <img src={gallary2} alt="Gallery 2" id="i" />
          <img src={gallary3} alt="Gallery 3" id="i" />
        </div>
        <h1 id="bn" className="hd">Map</h1>
        <div className="map-container">
          <Map />
        </div>
      </div>
      <div className="buttom-section">
        <h1 id="b" className='hd'>Doctor's List</h1>
        <div className="doctor-list">
          {doctorList.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className='doctor-c'>
                <div className="doctor-image">
                  <img src={doctor.image} alt={`Doctor ${index + 1}`} />
                </div>
                <div className="doctor-details-appoint">
                  <h3>Name: {doctor.name}</h3>
                  <p className='speciality'><span>Specialty:</span> {doctor.specialty}</p>
                  <p className='location'><span>Location:</span> {doctor.location}</p>
                  <p className='slots'><span>Available Slots:</span> {doctor.availableSlots.join(", ")}</p>
                  <p className='fees'><span>Consultant Fees(₹):</span> {doctor.consultantFees}</p>
                  <button id="button" onClick={() => handleBookAppointment(doctor.name)}>
                    Book Appointment
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={buyFunction} className="text-white bg-red-800 hover:bg-red-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Pay</button>
      </div>
    </div>
  );
}

export { ClinicAppointment };
