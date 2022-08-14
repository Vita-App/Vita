import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from 'store';

interface ProtectedRouteProps {
  isRegisteredGuard?: boolean;
  redirectTo?: string;
  inverse?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isRegisteredGuard = false,
  redirectTo,
  inverse = false,
}) => {
  const auth = useRecoilValue(authState);

  if (!inverse && !auth.isLoggedIn) {
    return <Navigate to={redirectTo || '/auth'} />;
  }

  if (isRegisteredGuard) {
    if (!auth.user?.signup_completed) {
      return <Navigate to="/registration-form" />;
    }

    return <Outlet />;
  }

  if (inverse) {
    if (auth.isLoggedIn) {
      return <Navigate to={redirectTo || '/'} />;
    }

    return <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
