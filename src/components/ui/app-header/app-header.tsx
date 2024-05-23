import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { getUser } from '../../../services/slices/userSlice';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleCheckAuth = () => {
    dispatch(getUser());
  };
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink className={styles.link} to='/'>
              <BurgerIcon type={'primary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>

          <>
            <NavLink
              onClick={handleCheckAuth}
              className={styles.link}
              to='/profile/orders'
            >
              <ListIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          onClick={handleCheckAuth}
          className={styles.link}
          to='/profile'
        >
          <div className={styles.link_position_last}>
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </NavLink>
      </nav>
    </header>
  );
};
