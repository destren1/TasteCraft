import { updateUserApi } from '@api';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';
    setUser({ name, email });
  }, [localStorage.getItem('name'), localStorage.getItem('email')]);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('name', formValue.name);
    localStorage.setItem('email', formValue.email);
    setIsSubmitting(true);

    const user = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    };
    updateUserApi(user).finally(() => setIsSubmitting(false));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      isSubmitting={isSubmitting}
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
