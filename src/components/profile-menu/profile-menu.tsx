import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/slices/userSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
