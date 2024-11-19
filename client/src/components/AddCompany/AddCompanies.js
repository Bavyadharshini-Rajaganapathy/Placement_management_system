import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCompanies = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    description: '',
    istop: false,
    ishiring: false,
    weblink: '',
    headquarters: '',
    job_locations: '',
    education: '',
    skills: '',
    cgpa: '',
    salary_range: '',
    benefits: '',
    application_process: '',
    study_pattern: '',
    drive_link: '',
    contact_email: '',
    contact_phone: '',
    linkedin_url: '',
    twitter_url: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    console.log('Form data:', companyData); // Debug the data being sent
    try {
      const response = await axios.post('http://localhost:5000/api/companies/add', companyData);
      alert(response.data.message || 'Company added successfully');
      navigate('/top-companies');
    } catch (error) {
      setError(error.response?.data?.error || 'Error adding company');
      console.error('Error response:', error.response || error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
        {/* Back Arrow */}
      <span
        className="material-icons text-white-800 text-4xl absolute top-4 left-4 cursor-pointer hover:text-gray-600"
        onClick={() => navigate(-1)} // Navigate to the previous page
      >
        arrow_back_ios
      </span>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Company</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
              required
            />
            <label className="block mb-2 mt-4">Description:</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
              required
            />
            <label className="block mb-2 mt-4">Website Link:</label>
            <input
              type="text"
              name="weblink"
              value={companyData.weblink}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Headquarters:</label>
            <input
              type="text"
              name="headquarters"
              value={companyData.headquarters}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Job Locations:</label>
            <input
              type="text"
              name="job_locations"
              value={companyData.job_locations}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Education:</label>
            <input
              type="text"
              name="education"
              value={companyData.education}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Skills:</label>
            <input
              type="text"
              name="skills"
              value={companyData.skills}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">CGPA:</label>
            <input
              type="text"
              name="cgpa"
              value={companyData.cgpa}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Salary Range:</label>
            <input
              type="text"
              name="salary_range"
              value={companyData.salary_range}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Benefits:</label>
            <textarea
              name="benefits"
              value={companyData.benefits}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Application Process:</label>
            <textarea
              name="application_process"
              value={companyData.application_process}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Study Pattern:</label>
            <input
              type="text"
              name="study_pattern"
              value={companyData.study_pattern}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Drive Link:</label>
            <input
              type="text"
              name="drive_link"
              value={companyData.drive_link}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Contact Email:</label>
            <input
              type="email"
              name="contact_email"
              value={companyData.contact_email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Contact Phone:</label>
            <input
              type="tel"
              name="contact_phone"
              value={companyData.contact_phone}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">LinkedIn URL:</label>
            <input
              type="url"
              name="linkedin_url"
              value={companyData.linkedin_url}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <label className="block mb-2 mt-4">Twitter URL:</label>
            <input
              type="url"
              name="twitter_url"
              value={companyData.twitter_url}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded"
            />
            <div className="flex items-center mt-4">
              <label className="mr-2">Top Company:</label>
              <input
                type="checkbox"
                name="istop"
                checked={companyData.istop}
                onChange={handleCheckboxChange}
                className="bg-gray-700"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="mr-2">Hiring:</label>
              <input
                type="checkbox"
                name="ishiring"
                checked={companyData.ishiring}
                onChange={handleCheckboxChange}
                className="bg-gray-700"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Save
          </button>
          <button onClick={handleCancel} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanies;
