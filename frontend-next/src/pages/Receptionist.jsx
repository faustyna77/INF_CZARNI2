// Receptionist.jsx (NewOrderForm)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewOrderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
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

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      client: {
        ...formData.client,
        [name]: value
      }
    });
  };

  const handleDeceasedChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      deceased: {
        ...formData.deceased,
        [name]: value
      }
    });
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // After submission, you might want to navigate to another page
    // navigate('/orders');
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-serif border border-gray-700 rounded overflow-hidden shadow-lg">
      <div className="bg-gray-900 text-gray-300 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <h2>Realizacja nowego zlecenia przez recepcję</h2>
        <div className="flex gap-2">
          <button className="bg-transparent text-gray-300 hover:text-white">—</button>
          <button className="bg-transparent text-gray-300 hover:text-white">□</button>
          <button className="bg-transparent text-gray-300 hover:text-white">✕</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 bg-gray-800">
        <div className="flex flex-wrap gap-5 mb-5">
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
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">numer telefonu</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.client.phoneNumber}
                onChange={handleClientChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
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
              />
            </div>
          </div>

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
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">data urodzenia</label>
              <input
                type="text"
                name="birthDate"
                value={formData.deceased.birthDate}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-400 italic">data zgonu</label>
              <input
                type="text"
                name="deathDate"
                value={formData.deceased.deathDate}
                onChange={handleDeceasedChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-300"
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
              />
            </div>
          </div>

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
            className="bg-gray-600 hover:bg-gray-500 text-gray-300 border-none px-8 py-3 text-base rounded uppercase font-serif tracking-wide shadow transition-colors"
          >
            DODAJ
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrderForm;