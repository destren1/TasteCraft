import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const success = useSelector((state) => state.user.success);
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.previousRoute;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }))
      .unwrap()
      .then((response) => {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('name', response.user.name);
        localStorage.setItem('email', response.user.email);
      })
      .catch(() => {
        setCookie('accessToken', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('name', '');
        localStorage.setItem('email', '');
      });
  };

  useEffect(() => {
    if (success && previousRoute !== null && previousRoute !== undefined) {
      navigate(previousRoute);
    } else if (success) {
      navigate('/');
    }
  }, [success]);

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
