import React, { useState } from 'react';

function AddDoctorForm({ addDoctor, isDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: '',
    rating: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.rating || formData.rating < 1 || formData.rating > 5)
      newErrors.rating = 'Rating must be between 1 and 5';
    if (!formData.phone || !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone))
      newErrors.phone = 'Phone must be in the format (123) 456-7890';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Add the new doctor to the list
      addDoctor(formData);
      // Reset form fields
      setFormData({
        name: '',
        specialty: '',
        location: '',
        rating: '',
        phone: '',
        email: '',
      });
      setErrors({});
    } else {
      // Set the errors state if validation fails
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-lg shadow-lg mb-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
      <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Specialty</label>
        <input
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Rating (1 to 5)</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className={`w-full p-2 border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone (Format: (123) 456-7890)</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Add Doctor
      </button>
    </form>
  );
}

export default AddDoctorForm;
