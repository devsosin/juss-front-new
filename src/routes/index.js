import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";

import Asset from "../pages/Asset";

import Pay from "../pages/Pay";
import Benefit from "../pages/Benefit";
import Stock from "../pages/Stock";
import Menu from "../pages/Menu";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asset" element={<Asset />} />

      <Route path="/benefit" element={<Benefit />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
};

export default AllRoutes;
