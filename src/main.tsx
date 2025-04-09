import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// @ts-expect-error temporary fix
import "./index.css";

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
