import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/companies/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className="min-h-[800px] flex flex-col items-center bg-gray-100 px-5">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">{company.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{company.description}</p>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Location:</strong> {company.Location}
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Roles Available:</strong> {company.roles || 'No roles listed'}
        </p>
        <a href={company.weblink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Visit Official Website
        </a>
      </div>
    </div>
  );
};

export default ViewDetails;
