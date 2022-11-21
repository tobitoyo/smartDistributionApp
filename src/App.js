import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Packaging from "./pages/packaging";
import Tracker from "./pages/tracking";
import Drivers from "./pages/drivers";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/smartDistributionApp" component={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Drivers" element={<Drivers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
