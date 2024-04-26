import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Start from "../pages/Start";
import Home from "../pages/Home";
import Asset from "../pages/Asset";
import Account from "../pages/Account";
import Withdraw from "../pages/Withdraw";
import Expense from "../pages/Expense";
import Transfer from "../pages/Transfer";

import Pay from "../pages/Pay";
import Benefit from "../pages/Benefit";
import Stock from "../pages/Stock";
import Menu from "../pages/Menu";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/account/:accountId" element={<Account />} />
        <Route path="/withdraw/:accountId" element={<Withdraw />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/transfer/:fromId/:toId" element={<Transfer />} />

        <Route path="/benefit" element={<Benefit />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/menu" element={<Menu />} />
      </Route>

      <Route path="/start" element={<Start />} />
    </Routes>
  );
};

export default AllRoutes;
