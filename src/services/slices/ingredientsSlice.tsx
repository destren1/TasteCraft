import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

interface IIngredients {
  bun: TIngredient | null | undefined;
  nonBunIngredients: TConstructorIngredient[];
  ingredients: TIngredient[];
}

const initialState: IIngredients = {
  bun: null,
  nonBunIngredients: [],
  ingredients: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientByid: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient._id === _id
      );

      if (ingredient) {
        const newIngredient: TConstructorIngredient = {
          ...ingredient,
          id: _id
        };
        ingredient.type === 'bun'
          ? (state.bun = ingredient)
          : state.nonBunIngredients.push(newIngredient);
      }
    },
    deleteIngredientById: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      state.nonBunIngredients = state.nonBunIngredients.filter(
        (ingredient) => ingredient._id !== _id
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  }
});

export default ingredientsSlice.reducer;
export const { getIngredientByid, deleteIngredientById } =
  ingredientsSlice.actions;
