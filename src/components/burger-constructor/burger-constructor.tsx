import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector((state: RootState) => state.ingredients.bun);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.nonBunIngredients
  );
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    dispatch(getUser());
    if (!isAuthorized) {
      navigate('/login');
    } else {
      navigate('/feed/:number', { state: { backgroundLocation: location } });
    }
  };

  const closeOrderModal = () => {};

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
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
