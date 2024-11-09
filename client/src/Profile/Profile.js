import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const email = localStorage.getItem('userEmail');

    if (email && userType) {
      axios.get(`http://localhost:5000/api/profile`, {
        params: { email, userType },
      })
        .then((response) => {
          if (response.data.success) {
            setProfileData(response.data.profile);
          } else {
            setError(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          setError('Error fetching profile data');
        });
    } else {
      setError('User information not found. Please log in.');
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedName(profileData.name);
    setUpdatedEmail(profileData.email);
  };

  const handleSave = () => {
    if (!updatedName || !updatedEmail) {
      setError('Name and email are required.');
      return;
    }

    axios.put(`http://localhost:5000/api/profile/update`, {
      email: profileData.email,
      name: updatedName,
      newEmail: updatedEmail,
    })
      .then((response) => {
        if (response.data.success) {
          setProfileData(response.data.profile);
          setEditMode(false);
          setSuccessMessage('Profile updated successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      });
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ml-auto'>
      <div className='relative h-96 bg-black-50 w-96 rounded-lg mr-28 mb-80 p-10'>
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className='absolute top-2 right-2 text-white text-2xl font-bold'>
          &times;
        </button>
        
        <div>
          <h2 className='font-bold text-2xl font-gowun ml-20 mb-10'>Your Details</h2>
          {successMessage && <div className='text-green-500'>{successMessage}</div>}
          {editMode ? (
            <div>
              <label className='text-white font-semibold'>
                Name:
                <br />
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className='h-10 w-full py-2 px-3 rounded-lg border shadow text-black text-lg mb-2 mt-2'
                />
              </label>
              <br />
              <label className='text-white font-semibold'>
                Email:
                <br />
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className='h-10 w-full py-2 px-3 rounded-lg border shadow text-black text-lg mb-2 mt-2'
                />
              </label>
              <button onClick={handleSave} className='bg-white text-black font-semibold h-10 w-24 rounded-lg text-xl mt-6 ml-8'>Save</button>
              <button onClick={handleCancel} className='bg-white text-black font-semibold h-10 w-24 rounded-lg text-xl mt-6 ml-8'>Cancel</button>
            </div>
          ) : (
            <div>
              <p className='text-xl font-semibold mb-8 mr-4'><strong>Name:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{profileData.name}</p>
              <p className='text-xl font-semibold mb-8 mr-4'><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profileData.email}</p>
              <button className='bg-white text-black h-12 w-28 font-bold text-xl rounded-full ml-20 mt-8' onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
