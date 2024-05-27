import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/slices/ingredientsSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const allOrders = useSelector((state: RootState) => state.ingredients.orders);

  useEffect(() => {
    dispatch(getOrders());
  });

  const orders: TOrder[] = allOrders;

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
