import React from 'react';

function DoctorCard({ doctor, onClick, isDarkMode}) {
  return (
    <div  onClick={onClick} className={`cursor-pointer p-4 m-2 border rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
      <h2 className="text-lg font-bold">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialty}</p>
      <p className="text-gray-600">{doctor.location}</p>
      <p className="text-yellow-500">Rating: {doctor.rating} / 5</p>
    </div>
  );
}

export default DoctorCard;
