import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from 'src/services/store';
import { Preloader } from '../ui/preloader';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLogout = useSelector((state: RootState) => state.user.logout);
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  useEffect(() => {
    if (isLogout) {
      navigate('/', { replace: true });
    }
  }, [isLogout, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthorized) {
    return <Navigate to='/login' />;
  }

  return children;
};
