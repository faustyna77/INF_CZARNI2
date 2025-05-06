import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../layouts/Navigation';
import RootLayout from '../layouts/RootLayout';
import Receptionist from './Receptionist';
import NotFound from '../components/NotFound';
import AddUser from './AddUser';
import Dashboard from './Dashboard';
import Log from './Log';
import MainPanel from './MainPanel';
import Profile from './Profile';
import Raports from './Raports';
import TaskPlans from './TaskPlans';
import UpdateUser from './UpdateUser';

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/receptionist" element={<Receptionist />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/log" element={<Log />} />
          <Route path="/main-panel" element={<MainPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/raports" element={<Raports />} />
          <Route path="/task-plans" element={<TaskPlans />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default App;