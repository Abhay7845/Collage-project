import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateComponent = () => {
  return (
    <div>{Cookies.get("token") ? <Outlet /> : <Navigate to="/register" />}</div>
  );
};

export default PrivateComponent;
