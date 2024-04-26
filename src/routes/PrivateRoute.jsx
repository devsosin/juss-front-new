import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("jwt-token");

  if (!accessToken) {
    return <Navigate to="/start" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
