import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.ingredients.orders);

  useEffect(() => {
    dispatch(getOrders());
  });

  const orders: TOrder[] = allOrders;

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
