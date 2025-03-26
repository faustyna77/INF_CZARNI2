import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import Profile from "./pages/Profile";
import Log from "./pages/Log";
import Admin from "./pages/admin-panel/Admin.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import './index.css';

// 🔧 Komponent z tokenem globalnym
const Root = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout token={token} setToken={setToken} />,
      children: [
        {
          path: "/",
          element: <App token={token} setToken={setToken} />
        },
        {
          path: "/profile",
          element: <Profile token={token} />
        },
        {
          path: "/admin",
          element: <Admin token={token} />
        },
      ]
    },
    {
      path: "/log",
      element: <Log setToken={setToken} />
    },
    {
      path: "*",
      element: <h1>404 - Strona nie istnieje</h1>
    }
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Root />
    </StrictMode>
);