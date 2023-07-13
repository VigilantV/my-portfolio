import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Navigate replace to="/portfolio" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
