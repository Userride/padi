

// export { DoctorList, LocationList };
import React from 'react';
import { FindDoctors} from './fg.jsx'; // Import DoctorList and LocationList components

function DoctorsResults() {
  return (
    <div className="container1">
      <FindDoctors />
      {/* <LocationList /> */}
    </div>
  );
}

export { DoctorsResults }; // Wrap the exported component in curly braces






