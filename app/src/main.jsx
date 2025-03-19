import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import  Profile  from "./Profile";

import Log from "./Log";

import Admin from "./Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "log",
    element: <Log />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "*", // Fallback dla nieznanych ścieżek
    element: <h1>404 - Strona nie istnieje</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
