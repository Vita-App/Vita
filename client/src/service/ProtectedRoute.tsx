import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from 'store';

interface ProtectedRouteProps {
  redirectTo: string;
  inverse?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo,
  inverse = false,
}) => {
  const auth = useRecoilValue(authState);

  console.log(auth.isLoggedIn);

  if (inverse) {
    if (auth.isLoggedIn) {
      return <Navigate to={redirectTo} />;
    }

    return <Outlet />;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
