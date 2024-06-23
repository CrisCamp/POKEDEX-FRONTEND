// src/routes/PrivateRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAdmin: boolean;
  children?: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAdmin,
  children,
  redirectTo = "/",
}) => {
  if (!isAdmin) {
    return <Navigate to={redirectTo} />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
