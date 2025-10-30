import React from "react";
import AuthContext from "../../context/AuthContext";
import { use } from "react";
import { Navigate, useLocation } from "react-router";

function PrivateRoute({ children }) {
  const { user } = use(AuthContext);
  const location = useLocation();

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate state={location.pathname} to={"/register"} />;
  }
}

export default PrivateRoute;
