import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchTopCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies/top');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching top companies:', error);
      }
    };

    fetchTopCompanies();
  }, []);

  const handleViewDetailsClick = (companyId) => {
    navigate(`/view-details/${companyId}`);
  };

  const handleEditClick = (companyId) => {
    navigate(`/edit-company/${companyId}`);
  };

  const handleDeleteClick = async (companyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this company?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/companies/${companyId}`);
        alert('Company deleted successfully');
        setCompanies(companies.filter((company) => company.id !== companyId));
      } catch (error) {
        console.error('Error deleting company:', error);
        alert('Failed to delete company');
      }
    }
  };

  const handleAddCompanyClick = () => {
    navigate('/add-company');
  };

  return (
    <div className="min-h-[800px] flex justify-center items-center bg-gray-100 px-5">
      <div className="max-w-6xl w-full">
        <div className="relative w-full h-[60px] mt-4 mb-6 ms-96">
          <span
            className="material-icons absolute top-0 right-0 text-gray-800 text-4xl cursor-pointer hover:text-gray-600"
            onClick={() => navigate(-1)}
          >
            home
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-6 mt-6 text-center text-gray-800">
          Top Companies
        </h1>

        {/* Add Icon for staff below the heading */}
        <div className=''>
        {userType === 'staff' && (
          <div className="flex mb-6 me-96 left-0">
            <span
              className="material-icons text-gray-800 text-5xl cursor-pointer hover:text-green-800 left-0"
              onClick={handleAddCompanyClick}
            >
              add
            </span>
          </div>
        )}
        </div>
        {/* List of Companies */}
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-lg mb-8 p-8 min-h-[150px] flex justify-between items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div>
              <h2
                className="text-3xl font-bold mb-4 cursor-pointer text-black-500 hover:underline"
                onClick={() => window.open(company.weblink, '_blank')}
              >
                {company.name}
              </h2>
              <p className="text-lg text-gray-600">{company.description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleViewDetailsClick(company.id)}
                className="bg-black text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                View Details
              </button>
              {userType === 'staff' && (
                <>
                  <button
                    onClick={() => handleEditClick(company.id)}
                    className="bg-gray-800 text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(company.id)}
                    className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
