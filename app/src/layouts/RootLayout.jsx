import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const RootLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    console.log('RootLayout rendered');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen">
      {/*      /!* Sidebar *!/*/}
      {/*      <div className={`*/}
      {/*  ${isSidebarOpen ? 'w-64' : 'w-16'} */}
      {/*  bg-gray-800 text-white transition-all duration-300*/}
      {/*`}>*/}
      {/*          <div className="p-4">*/}
      {/*              <button*/}
      {/*                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}*/}
      {/*                  className="mb-4 w-full"*/}
      {/*              >*/}
      {/*                  {isSidebarOpen ? 'Zwiń' : 'Rozwiń'}*/}
      {/*              </button>*/}

      {/*              <nav>*/}
      {/*                  <ul className="space-y-2">*/}
      {/*                      <li>*/}
      {/*                          <Link*/}
      {/*                              to="/"*/}
      {/*                              className="block p-2 hover:bg-gray-700 rounded"*/}
      {/*                          >*/}
      {/*                              {isSidebarOpen ? 'Dashboard' : 'DS'}*/}
      {/*                          </Link>*/}
      {/*                      </li>*/}
      {/*                      <li>*/}
      {/*                          <Link*/}
      {/*                              to="/profile"*/}
      {/*                              className="block p-2 hover:bg-gray-700 rounded"*/}
      {/*                          >*/}
      {/*                              {isSidebarOpen ? 'Profil' : 'PR'}*/}
      {/*                          </Link>*/}
      {/*                      </li>*/}
      {/*                      <li>*/}
      {/*                          <Link*/}
      {/*                              to="/tasks"*/}
      {/*                              className="block p-2 hover:bg-gray-700 rounded"*/}
      {/*                          >*/}
      {/*                              {isSidebarOpen ? 'Zadania' : 'ZD'}*/}
      {/*                          </Link>*/}
      {/*                      </li>*/}
      {/*                      <li>*/}
      {/*                          <Link*/}
      {/*                              to="/admin"*/}
      {/*                              className="block p-2 hover:bg-gray-700 rounded"*/}
      {/*                          >*/}
      {/*                              {isSidebarOpen ? 'Admin' : 'AD'}*/}
      {/*                          </Link>*/}
      {/*                      </li>*/}
      {/*                      <li>*/}
      {/*                          <button*/}
      {/*                              onClick={handleLogout}*/}
      {/*                              className="w-full text-left p-2 hover:bg-red-700 rounded"*/}
      {/*                          >*/}
      {/*                              {isSidebarOpen ? 'Wyloguj' : 'WY'}*/}
      {/*                          </button>*/}
      {/*                      </li>*/}
      {/*                  </ul>*/}
      {/*              </nav>*/}
      {/*          </div>*/}
      {/*      </div>*/}

      {/*      /!* Główna treść *!/*/}
      {/*      <div className="flex-1 overflow-y-auto p-6">*/}
      {/*          <div className="bg-red-100 p-4 mb-4">*/}
      {/*              Debugger: Outlet rendering*/}
      {/*          </div>*/}
                <Outlet />
      {/*      </div>*/}
        </div>
    );
};

export default RootLayout;