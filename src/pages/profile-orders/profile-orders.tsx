import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/slices/ingredientsSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.ingredients.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  });

  return <ProfileOrdersUI orders={orders} />;
};
