import React from "react";
import AuthContext from "../../context/AuthContext";
import { use } from "react";
import { Navigate, useLocation } from "react-router";

function PrivateRoute({ children }) {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-primary w-10"></span>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate state={location.pathname} to={"/register"} />;
  }
}

export default PrivateRoute;
