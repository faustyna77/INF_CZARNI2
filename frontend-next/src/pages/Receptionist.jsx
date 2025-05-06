import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewOrderForm = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null); 
  const [formData, setFormData] = useState({
    client: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    },
    deceased: {
      firstName: '',
      lastName: '',
      birthDate: '',
      deathDate: '',
      deathCertificateNumber: ''
    },
    services: {
      bodyCollection: false,
      coffinPurchase: false,
      funeralCeremony: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      client: { ...prev.client, [name]: value }
    }));
  };

  const handleDeceasedChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      deceased: { ...prev.deceased, [name]: value }
    }));
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, [name]: checked }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('token');

    try {
      // Create Client
      const clientResponse = await fetch('http://localhost:8080/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData.client)
      });

      if (!clientResponse.ok) throw new Error('Błąd podczas tworzenia klienta');
      const client = await clientResponse.json();

      // Create Order
      const orderData = {
        cadaverFirstName: formData.deceased.firstName,
        cadaverLastName: formData.deceased.lastName,
        client: { id: client.id },
        status: 'pending'
      };

      const orderResponse = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) throw new Error('Błąd podczas tworzenia zlecenia');
      
      setSuccess('Zlecenie zostało pomyślnie utworzone!'); // Set success message
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-serif border border-gray-700 rounded overflow-hidden shadow-lg">
      <form onSubmit={handleSubmit} className="p-5 bg-gray-800">
        {error && (
          <div className="mb-4 p-3 bg-red-800 text-red-200 rounded">
            Błąd: {error}
          </div>
        )}

        {success && ( // Place this block here
            <div className="mb-4 p-3 bg-green-800 text-green-200 rounded">
              {success}
            </div>
          )}

        <div className="flex flex-wrap gap-5 mb-5">
          {/* Client Data Section */}
          <div className="flex-1 min-w-[300px] bg-gray-700 p-4 rounded shadow">
            <div className="bg-gray-900 text-gray-300 p-2 text-center mb-4 rounded font-serif tracking-wide border-b border-gray-500">
              Dane klienta
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">imię</label>
              <input
                type="text"
                name="firstName"
                value={formData.client.firstName}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">nazwisko</label>
              <input
                type="text"
                name="lastName"
                value={formData.client.lastName}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">numer telefonu</label>
              <input
                type="tel"
                name="phone"
                value={formData.client.phoneNumber}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">adres e-mail</label>
              <input
                type="email"
                name="email"
                value={formData.client.email}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">adres zamieszkania</label>
              <input
                type="text"
                name="address"
                value={formData.client.address}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
          </div>

          {/* Deceased Data Section */}
          <div className="flex-1 min-w-[300px] bg-gray-700 p-4 rounded shadow">
            <div className="bg-gray-900 text-gray-300 p-2 text-center mb-4 rounded font-serif tracking-wide border-b border-gray-500">
              Dane osoby zmarłej
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">imię</label>
              <input
                type="text"
                name="firstName"
                value={formData.deceased.firstName}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">nazwisko</label>
              <input
                type="text"
                name="lastName"
                value={formData.deceased.lastName}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">data urodzenia</label>
              <input
                type="date"
                name="birthDate"
                value={formData.deceased.birthDate}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">data zgonu</label>
              <input
                type="date"
                name="deathDate"
                value={formData.deceased.deathDate}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">numer aktu zgonu</label>
              <input
                type="text"
                name="deathCertificateNumber"
                value={formData.deceased.deathCertificateNumber}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
                required
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="flex-1 min-w-[300px] bg-gray-700 p-4 rounded shadow">
            <div className="bg-gray-900 text-gray-300 p-2 text-center mb-4 rounded font-serif tracking-wide border-b border-gray-500">
              Usługi
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="bodyCollection"
                name="bodyCollection"
                checked={formData.services.bodyCollection}
                onChange={handleServiceChange}
                className="mr-2 accent-gray-500"
              />
              <label htmlFor="bodyCollection" className="text-sm text-gray-400">
                odebranie ciała przez zakład
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="coffinPurchase"
                name="coffinPurchase"
                checked={formData.services.coffinPurchase}
                onChange={handleServiceChange}
                className="mr-2 accent-gray-500"
              />
              <label htmlFor="coffinPurchase" className="text-sm text-gray-400">
                zakup trumny
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="funeralCeremony"
                name="funeralCeremony"
                checked={formData.services.funeralCeremony}
                onChange={handleServiceChange}
                className="mr-2 accent-gray-500"
              />
              <label htmlFor="funeralCeremony" className="text-sm text-gray-400">
                ceremonia pochówku
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-500 text-gray-300 border-none px-8 py-3 text-base rounded uppercase font-serif tracking-wide shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Przetwarzanie...' : 'DODAJ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrderForm;