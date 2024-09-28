import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-2 border rounded-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
