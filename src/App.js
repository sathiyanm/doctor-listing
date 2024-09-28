import React, { useState, useEffect } from "react";
import DoctorList from "./components/DoctorList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import DoctorModal from "./components/DoctorModal";
import Pagination from "./components/Pagination";
import AddDoctorForm from "./components/AddDoctorForm";
import Loading from "./components/Loading";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/solid";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDoctorFormVisible, setIsAddDoctorFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const doctorsPerPage = 10;

  useEffect(() => {
    fetch("/doctors.json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => { // just faking it to like api call to the loading 
          setDoctors(data);
          setFilteredDoctors(data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (doctor) => doctor.location === selectedLocation
      );
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to the first page when filters or search change
  }, [searchTerm, selectedSpecialty, selectedLocation, doctors]);

  const addDoctor = (newDoctor) => {
    setDoctors([newDoctor, ...doctors]);
    setFilteredDoctors([newDoctor, ...filteredDoctors]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark class
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;

  // Calculate the current page's data
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div
      className={`container mx-auto p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between pb-10">
            <h1 className="text-xl font-bold">Doctor Directory</h1>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <>
                  <SunIcon className="h-5 w-5" />
                  Light Mode
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
          <button
            className="flex items-center bg-green-500 text-white p-2 rounded-lg mb-4"
            onClick={() => setIsAddDoctorFormVisible(!isAddDoctorFormVisible)} // Toggle form visibility
          >
            {isAddDoctorFormVisible ? (
              <>
                <ChevronUpIcon className="h-5 w-5 mr-2" />
                Collapse Form
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-5 w-5 mr-2" />
                Add Doctor
              </>
            )}
          </button>
          {isAddDoctorFormVisible && ( // Conditionally render the form
            <AddDoctorForm isDarkMode={isDarkMode} addDoctor={addDoctor} />
          )}
          <SearchBar onSearch={setSearchTerm} />
          <div className="flex gap-4 mb-4">
            <Filter
              isDarkMode={isDarkMode}
              label="Specialty"
              options={[...new Set(doctors.map((d) => d.specialty))]}
              onSelect={setSelectedSpecialty}
            />
            <Filter
              isDarkMode={isDarkMode}
              label="Location"
              options={[...new Set(doctors.map((d) => d.location))]}
              onSelect={setSelectedLocation}
            />
          </div>
          <DoctorList
            doctors={currentDoctors}
            onDoctorSelect={setSelectedDoctor}
            isDarkMode={isDarkMode}
          />
          {selectedDoctor && (
            <DoctorModal
              isDarkMode={isDarkMode}
              doctor={selectedDoctor}
              onClose={() => setSelectedDoctor(null)}
            />
          )}
          {filteredDoctors.length > doctorsPerPage && (
            <Pagination
              doctorsPerPage={doctorsPerPage}
              totalDoctors={filteredDoctors.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
