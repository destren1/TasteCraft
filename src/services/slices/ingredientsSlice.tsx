import {
  TNewOrderResponse,
  getIngredientsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

export const getOrders = createAsyncThunk('ingredients/getOrders', async () =>
  getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'ingredients/order',
  async (data: string[] | string) => orderBurgerApi(data)
);

interface IIngredients {
  bun: TIngredient | null | undefined;
  nonBunIngredients: TConstructorIngredient[];
  ingredients: TIngredient[];
  ingredientsId: string[];
  orderRequest: boolean;
  responseData: TNewOrderResponse;
  orders: TOrder[];
}

const initialState: IIngredients = {
  bun: null,
  nonBunIngredients: [],
  ingredients: [],
  ingredientsId: [],
  orderRequest: false,
  responseData: { success: false, order: {} as TOrder, name: '' },
  orders: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientByid: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      const bunIngredient = state.ingredients.find(
        (ingredient) => ingredient._id === _id && ingredient.type === 'bun'
      );
      if (bunIngredient) {
        state.ingredientsId.push(_id);
        state.ingredientsId.push(_id);
      } else {
        state.ingredientsId.push(_id);
      }

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
      state.ingredientsId = state.ingredientsId.filter((id) => id !== _id);
    },
    moveElement: (
      state,
      action: PayloadAction<{ nonBunIngredientIndex: number; toIndex: number }>
    ) => {
      const { nonBunIngredientIndex, toIndex } = action.payload;
      const [movedItem] = state.nonBunIngredients.splice(
        nonBunIngredientIndex,
        1
      );
      state.nonBunIngredients.splice(toIndex, 0, movedItem);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.responseData = action.payload;
        state.nonBunIngredients = [];
        state.bun = null;
        state.ingredientsId = [];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
export const { getIngredientByid, deleteIngredientById, moveElement } =
  ingredientsSlice.actions;
