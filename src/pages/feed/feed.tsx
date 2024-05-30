import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getOrders } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.ingredients.feeds);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFeeds()).finally(() => setIsLoading(false));
    dispatch(getOrders());
  }, [dispatch]);

  const handleUpdateFeeds = () => {
    setIsLoading(true);
    dispatch(getFeeds()).finally(() => setIsLoading(false));
  };

  const orders: TOrder[] = feed.orders;

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleUpdateFeeds} />;
};
