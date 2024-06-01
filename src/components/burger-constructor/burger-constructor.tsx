import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { orderBurger } from '../../services/slices/ingredientsSlice';
import { useSelector, useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const bun = useSelector((state) => state.ingredients.bun);
  const ingredients = useSelector(
    (state) => state.ingredients.nonBunIngredients
  );
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  let orderRequest = useSelector((state) => state.ingredients.orderRequest);
  const ingredientsId = useSelector((state) => state.ingredients.ingredientsId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
