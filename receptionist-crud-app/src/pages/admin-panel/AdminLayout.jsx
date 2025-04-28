import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../layouts/Navigation';

const AdminLayout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;