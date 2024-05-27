import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  deleteIngredientById,
  moveElement
} from '../../services/slices/ingredientsSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ nonBunIngredientIndex, ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const _id = ingredient._id;

    const handleMoveDown = () =>
      dispatch(moveElement({ nonBunIngredientIndex, toIndex: index + 1 }));

    const handleMoveUp = () =>
      dispatch(moveElement({ nonBunIngredientIndex, toIndex: index - 1 }));

    const handleClose = () => {
      dispatch(deleteIngredientById(_id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
