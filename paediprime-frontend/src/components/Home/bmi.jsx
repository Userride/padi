// src/BmiGraph.jsx
import React from 'react';
import './profile.css'; // Optional: for styling
import img from './images/bmi.webp';
const BmiGraph = () => {
  return (
    <div className="bmi-graph">
      <h3>BMI Graph</h3>
      <img src={img} alt="BMI Graph" />
    </div>
  );
};

export {BmiGraph};
