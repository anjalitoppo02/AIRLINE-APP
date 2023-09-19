import React from "react";
import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

export const ProtectedRoute = ({ redirectPath = "/signin", children }) => {
  if (localStorage.getItem("role")) {
    return children;
  }

  return <Navigate to={redirectPath} replace />;
};

ProtectedRoute.propTypes = {
  redirectPath: propTypes.string,
  children: propTypes.node,
};
