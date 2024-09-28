import React from 'react';

function DoctorModal({ doctor, onClose, isDarkMode }) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">{doctor.name}</h2>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DoctorModal;
