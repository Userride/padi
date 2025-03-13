import React, { useState } from 'react';

function Map() {
  return (
    <div className="map-container">
      <iframe
        title="Map"
        // width="950"
        // height="550"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
}

function MapSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input" 
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export { Map, MapSearch };







