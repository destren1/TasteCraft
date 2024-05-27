import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';
import { orderBurger } from '../../services/slices/ingredientsSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector((state: RootState) => state.ingredients.bun);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.nonBunIngredients
  );
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  let orderRequest = useSelector(
    (state: RootState) => state.ingredients.orderRequest
  );
  const ingredientsId = useSelector(
    (state: RootState) => state.ingredients.ingredientsId
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login');
    } else {
      dispatch(orderBurger(ingredientsId))
        .unwrap()
        .then((response) => {
          setOrderModalData(response.order);
          setIsModalOpen(true);
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`));
    }
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
    setIsModalOpen(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      isModalOpen={isModalOpen}
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
