import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

// Import layoutu
import RootLayout from './layouts/RootLayout';

// Import stron
import Profile from './pages/Profile';
import Login from './pages/Login';
import Admin from './pages/Admin';
import TaskPlans from './pages/TaskPlans';
import NotFound from './components/NotFound';

// Prosty komponent zabezpieczający trasy
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'profile',
        element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        )
      },
      {
        path: 'tasks',
        element: (
            <ProtectedRoute>
              <TaskPlans />
            </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);