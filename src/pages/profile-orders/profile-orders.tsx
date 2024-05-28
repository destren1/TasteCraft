import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/ingredientsSlice';
import { RootState } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.ingredients.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  });

  return <ProfileOrdersUI orders={orders} />;
};
