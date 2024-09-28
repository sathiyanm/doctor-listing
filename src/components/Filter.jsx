import React from 'react';

function Filter({ label, options, onSelect,isDarkMode }) {
  return (
    <div className={`w-1/2`}>
      <label className={`block mb-2 text-sm font-medium text-gray-700 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</label>
      <select
        className={`w-full p-2 border rounded-lg text-black`}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
