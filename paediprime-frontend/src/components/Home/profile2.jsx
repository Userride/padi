// src/PatientProfilePage.jsx
import React from 'react';
import PatientProfile from './profile';
import DoctorInterface from './DoctorInterface';

const PatientProfilePage = () => {
  const patient = {
    name: 'Soumdipta Mandhana',
    fathersName: 'Amit Mandhana',
    mothersName: 'Sanchita Mandhana',
    age: 4,
    sex: 'Female',
    bloodGroup: 'O+',
    appointmentId: 'A123456',
    lastAppointmentDate: '2024-06-01',
    weight: 13,
    bmi: 17,
    pulse: 72,
    height: 80,
    respiratoryRate: 18,
    oxygenSaturation: 98,
  };

  return (
    <div>
      <PatientProfile {...patient} />
    </div>
  );
};

export {PatientProfilePage};

