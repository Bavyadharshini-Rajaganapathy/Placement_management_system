import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);

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

  return (
    <div className="min-h-[800px] flex justify-center items-center bg-gray-100 px-5">
      <div className="max-w-6xl w-full">
        <h1 className="text-5xl font-bold mb-10 mt-6 text-center text-gray-800">
        Top Companies
      </h1>
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-lg mb-8 p-8 min-h-[150px] flex justify-between items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">{company.name}</h2>
              <p className="text-lg text-gray-600">{company.description}</p>
            </div>
            <button className="bg-black text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
