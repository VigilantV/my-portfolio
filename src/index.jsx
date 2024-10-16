import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Portfolio from "./components/Portfolio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global/config.scss";
import variables from "./styles/global/_variables.scss";

// global color variables
window.whitish = variables.whitish;
window.paleBlue = variables.paleBlue;
window.lightBlue = variables.lightBlue;
window.fadeDarkBlue = variables.fadeDarkBlue;
window.lightRouge = variables.lightRouge;
window.rouge = variables.rouge;

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="portfolio" replace={true} />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
    ]
  }
], { basename: '/my-portfolio' });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={6000}
      closeOnClick={true}
      pauseOnHover
      hideProgressBar={false}
      draggable={false}
      theme="dark"
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// reportWebVitals(console.log);
