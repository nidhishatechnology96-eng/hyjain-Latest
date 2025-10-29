import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";

// Create root
const root = createRoot(document.getElementById("root"));

// The App component will now handle all context providers
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);