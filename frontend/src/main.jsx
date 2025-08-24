import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Subscribe from "./pages/Subscribe.jsx";
import Success from "./pages/Success.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Subscribe /> },
  { path: "/success", element: <Success /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
