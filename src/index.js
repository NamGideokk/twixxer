import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./animation.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
