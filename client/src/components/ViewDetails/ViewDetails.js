import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ViewDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
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

  if (!company) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Back Arrow */}
      <span
        className="material-icons text-gray-800 text-4xl absolute top-4 left-4 cursor-pointer hover:text-gray-600"
        onClick={() => navigate(-1)} // Navigate to the previous page
      >
        arrow_back_ios
      </span>

      {/* Right Side Company Details */}
      <div className="w-1/2 ms-auto flex flex-col items-start p-4"> {/* Changed width and added padding */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8">{company.name}</h1>
        <p className="text-xl text-gray-600">{company.description}</p> {/* Removed text-right */}
      </div>
      <div className="w-full h-96 bg-gray-700 flex justify-start items-center relative mt-10">
        {/* Positioning the image upwards with negative top margin and centering horizontally */}
        <div className="absolute left-10 -top-40 ms-44 w-1/3 h-auto rounded-lg shadow-lg">
          <img
            src="/images/image1.jpg" // Replace with the actual path to the image
            alt="Interview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Slider for additional company details */}
        <Slider {...sliderSettings} className="text-white w-1/4 ms-auto me-64">
          {/* Job Roles */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Job Roles Available</h2>
            <ul className="list-disc list-inside text-xl space-y-2 ms-10 mb-2">
              {company.roles?.split(', ').map((role, index) => (
                <li key={index} className="hover:underline">{role}</li>
              ))}
            </ul>
          </div>

          {/* Eligibility Criteria */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Eligibility Criteria</h2>
            <p className="text-xl mb-2 ms-10">Education: {company.education || 'Not specified'}</p>
            <p className="text-xl mb-2 ms-10">Skills: {company.skills || 'Not specified'}</p>
            <p className="text-xl ms-10">CGPA: {company.cgpa || 'Not specified'}</p>
          </div>

          {/* Salary and Benefits */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Salary and Benefits</h2>
            <p className="text-xl mb-2 ms-10">Salary Range: {company.salary_range || 'Not specified'}</p>
            <p className="text-xl ms-10">Benefits: {company.benefits || 'Not specified'}</p>
          </div>

          {/* Application Process */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Application Process</h2>
            <p className="text-xl ms-10">{company.application_process || 'Not specified'}</p>
          </div>

          {/* Study Pattern and Drive Link */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Study Pattern</h2>
            <p className="text-xl mb-4 ms-10">{company.study_pattern || 'Not specified'}</p>
            {company.drive_link && (
              <a href={company.drive_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xl ms-10">
                View Study Materials
              </a>
            )}
          </div>

          {/* Contact Information */}
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
            <p className="text-xl mb-2 ms-10">Email: {company.contact_email || 'Not specified'}</p>
            <div className="flex space-x-4 mt-4 ms-10">
              {company.linkedin_url && (
                <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg">LinkedIn</a>
              )}
              {company.twitter_url && (
                <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg">Twitter</a>
              )}
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ViewDetails;
