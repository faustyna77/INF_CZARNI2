// RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../layouts/Navigation.jsx';  

const RootLayout = ({ token, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navigation token={token} handleLogout={handleLogout} />
      <main className="flex-1 p-6 bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;