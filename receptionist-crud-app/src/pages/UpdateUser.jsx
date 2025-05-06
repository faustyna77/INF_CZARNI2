import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import receptionistService from '../services/receptionistService';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await receptionistService.getUserById(id);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await receptionistService.updateUser(id, userData);
      navigate('/admin-panel/UserManagement'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={userData.address} onChange={handleChange} required />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;