import { useState, useEffect } from 'react';
import receptionistService from '../services/receptionistService';

const useClientData = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await receptionistService.getClients();
      setClients(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData) => {
    try {
      const response = await receptionistService.createClient(clientData);
      setClients((prevClients) => [...prevClients, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateClient = async (clientId, clientData) => {
    try {
      const response = await receptionistService.updateClient(clientId, clientData);
      setClients((prevClients) =>
        prevClients.map((client) => (client.id === clientId ? response.data : client))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await receptionistService.deleteClient(clientId);
      setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
  };
};

export default useClientData;