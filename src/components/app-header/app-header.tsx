import { FC, useState, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const [name, setName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    setName(name);
  }, [localStorage.getItem('name')]);

  return <AppHeaderUI userName={name} />;
};
