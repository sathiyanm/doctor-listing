import React from 'react';
import DoctorCard from './DoctorCard';

function DoctorList({ doctors, onDoctorSelect, isDarkMode}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <DoctorCard isDarkMode={isDarkMode} key={doctor.id} doctor={doctor} onClick={() => onDoctorSelect(doctor)} />
      ))}
    </div>
  );
}

export default DoctorList;
