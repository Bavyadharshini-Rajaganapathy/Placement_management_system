import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleViewDetailsClick = (companyId) => {
    navigate(`/view-details/${companyId}`); // Navigate to the company details page
  };

  return (
    <div className="min-h-[800px] flex flex-col items-center bg-gray-100 px-5">
      <h1 className="text-5xl font-bold mb-10 mt-6 text-center text-gray-800">
        Hiring Companies
      </h1>

      <div className="max-w-6xl w-full">
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
            <button
              onClick={() => handleViewDetailsClick(company.id)}
              className="bg-black text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
