import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyForm = () => {
  const { companyId } = useParams();
  const [usn, setUsn] = useState(''); // Capture USN instead of candidate ID
  const [jobRole, setJobRole] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/apply', {
        usn,
        company_id: companyId,
        job_role: jobRole,
        resume_link: resumeLink,
        cover_letter: coverLetter,
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-5">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Apply for Job</h2>
        
        <label className="block text-lg mb-2">User Number</label>
        <input
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Enter your USN"
          required
        />

        <label className="block text-lg mb-2">Job Role</label>
        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Enter job role"
          required
        />

        <label className="block text-lg mb-2">Resume Link</label>
        <input
          type="url"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Enter resume link"
          required
        />

        <label className="block text-lg mb-2">Cover Letter</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Enter cover letter"
          rows="4"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
