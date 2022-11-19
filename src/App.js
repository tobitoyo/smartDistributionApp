import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Packaging from "./pages/packaging";
import Tracker from "./pages/tracking";
import Drivers from "./pages/drivers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Drivers" element={<Drivers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
