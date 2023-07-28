import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Portfolio from "./components/Portfolio";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/portfolio" element={<Portfolio />} />
          <Route path="/" element={<Navigate replace to="/portfolio" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
