import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseScrollToTop from "./components/common/UseScrollToTop";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename={"/my-portfolio"}>
        <UseScrollToTop>
          <Routes>
            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route path="/" element={<Navigate replace to="/portfolio" />} />
          </Routes>
        </UseScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
