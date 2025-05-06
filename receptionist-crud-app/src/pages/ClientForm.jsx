import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient, updateClient } from '../services/receptionistService';

const ClientForm = ({ clientId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (clientId) {
      // Fetch client data and set it to formData if clientId is provided
      // This part should call a function to fetch client data by ID
      // For example: fetchClientById(clientId).then(data => setFormData(data));
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clientId) {
        await updateClient(clientId, formData);
      } else {
        await createClient(formData);
      }
      navigate('/'); // Redirect to the main page or client list after submission
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <button type="submit">{clientId ? 'Update Client' : 'Add Client'}</button>
    </form>
  );
};

export default ClientForm;