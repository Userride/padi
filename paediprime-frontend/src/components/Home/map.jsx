import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './clinic.css'; // Import the CSS file for clinic stylings
import { Map } from './clinic.jsx';
import axios from 'axios';

function Clinic() {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.post("https://paediprime-4chb.onrender.com/api/doctordata3");
        console.log("Response data:", response.data); // Add this line to debug
        setClinics(response.data);
        setFilteredClinics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = query.toLowerCase();
    const filtered = clinics.filter(clinic =>
      clinic.location.toLowerCase().includes(location)
    );
    setFilteredClinics(filtered);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const location = e.target.value.toLowerCase();
    const filtered = clinics.filter(clinic =>
      clinic.location.toLowerCase().includes(location)
    );
    setFilteredClinics(filtered);
  };

  const handleClinicClick = async (clinic) => {
    try {
      // Store clinic name and location in local storage
      localStorage.setItem('selectedClinicName', clinic.name);
      localStorage.setItem('selectedClinicLocation', clinic.location);

      await axios.post("https://paediprime-4chb.onrender.com/api/location", { location: clinic.location });
      console.log("Location stored:", clinic.location);
    } catch (error) {
      console.error("Error storing location:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="clinic-container">
      <div className="left-section">
        <h1 className="hd">Find Clinic</h1>
        <div className="search-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter location"
              value={query}
              onChange={handleInputChange}
              className="search-input" 
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
      <div className="right-section">
        <h1 className="hd">Search Result</h1>
        <div className="additional-images-container" id="results">
          {filteredClinics.length > 0 ? (
            filteredClinics.map((clinic, index) => (
              <Link
                to={`/AppointmentClinic`}
                key={index}
                className="clinic-link"
                onClick={() => handleClinicClick(clinic)} // Pass the entire clinic object
              >
                <div className="clinic">
                  <img src={clinic.image || img1} alt={clinic.name} />
                  <h2>{clinic.name}</h2>
                  <p className="location">{clinic.location}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No clinics found for the given location.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { Clinic };
