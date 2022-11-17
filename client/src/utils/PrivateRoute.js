import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ permissions, redirectPath = '/login', children }) => {
  if (!permissions) return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
};

export default PrivateRoute;
