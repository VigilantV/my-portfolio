import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./styles/global/config.scss";

import variables from "./styles/global/_variables.scss";

// global color variables
window.whitish = variables.whitish;
window.paleBlue = variables.paleBlue;
window.lightBlue = variables.lightBlue;
window.fadeDarkBlue = variables.fadeDarkBlue;
window.lightRouge = variables.lightRouge;
window.rouge = variables.rouge;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
