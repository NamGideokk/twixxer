import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import firebase from "firebase/compat/app";
import { BrowserRouter } from "react-router-dom";

console.log(firebase);

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
