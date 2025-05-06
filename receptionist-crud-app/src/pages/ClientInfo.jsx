import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import receptionistService from '../services/receptionistService';

const ClientInfo = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await receptionistService.getClientById(clientId);
        setClient(response.data);
      } catch (err) {
        setError('Error fetching client information');
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, [clientId]);

  const handleDelete = async () => {
    try {
      await receptionistService.deleteClient(clientId);
      navigate('/clients'); // Redirect to clients list after deletion
    } catch (err) {
      setError('Error deleting client');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Client Information</h1>
      {client && (
        <div>
          <p>First Name: {client.firstName}</p>
          <p>Last Name: {client.lastName}</p>
          <p>Phone Number: {client.phoneNumber}</p>
          <p>Email: {client.email}</p>
          <p>Address: {client.address}</p>
          <button onClick={handleDelete}>Delete Client</button>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;