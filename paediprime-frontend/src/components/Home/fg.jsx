import React, { useState, useEffect } from 'react';
import './fg.css'; // Import the CSS file for doctor styling
import { Map } from './clinic.jsx'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [queryDoctor, setQueryDoctor] = useState('');
  const [queryLocation, setQueryLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.post("https://paediprime-4chb.onrender.com/api/doctordata2");
        console.log("Response data:", response.data); // Add this line to debug
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmitDoctor = (e) => {
    e.preventDefault();
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(queryDoctor.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    const filtered = doctors.filter(doctor =>
      doctor.location.toLowerCase().includes(queryLocation.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleClear = () => {
    setQueryDoctor('');
    setQueryLocation('');
    setFilteredDoctors(doctors);
  };

  const handleDoctorClick = (doctorName, doctorImage) => {
    localStorage.setItem('doctorName', doctorName);
    localStorage.setItem('doctorImage', doctorImage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="doctors-container">
      <div className="left-section">
        <h1 className="hd">Find Doctors</h1>
        <div className="search-container">
          {/* Doctor Search bar */}
          <form className="search-form" onSubmit={handleSubmitDoctor}>
            <input
              type="text"
              placeholder="Enter doctor name"
              value={queryDoctor}
              onChange={(e) => setQueryDoctor(e.target.value)}
              className="search-input" 
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          {/* Location Search bar */}
          <form className="search-form" onSubmit={handleSubmitLocation}>
            <input
              type="text"
              placeholder="Enter location"
              value={queryLocation}
              onChange={(e) => setQueryLocation(e.target.value)}
              className="search-input" 
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
      <div className="right-section">
        <div className="additional-doctors-container">
          <h2 className="hd">Search result</h2>
          <div className="row">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <div className="doctor-info" key={doctor._id}>
                  <Link to="/Doctor" onClick={() => handleDoctorClick(doctor.name, doctor.image)}>
                    <img src={doctor.image} alt={`Doctor Image ${index}`} />
                  </Link>
                  <div className="doctor-details">
                    <h2 className="doctor-name">
                      <Link to="/Doctor" onClick={() => handleDoctorClick(doctor.name, doctor.image)}>{doctor.name}</Link>
                    </h2>
                    <p className="doctor-specialty"><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p className="doctor-location"><strong>Location:</strong> {doctor.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No doctors found for the given query. Please check your input and try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { FindDoctors };
