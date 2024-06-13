import { TOrder } from '@utils-types';
import ingredientsSlice, {
  IIngredients,
  deleteIngredientById,
  getFeeds,
  getIngredientByid,
  getIngredients,
  getOrders,
  moveElement
} from '../slices/ingredientsSlice';
import { orderBurger } from '../slices/ingredientsSlice';

describe('ingredients slice test', () => {
  const testCaseOne: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [],
    ingredientsId: [],
    orderRequest: false,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const testCaseTwo: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [],
    ingredientsId: [],
    orderRequest: true,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const testCaseThree: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [],
    ingredientsId: [],
    orderRequest: false,
    responseData: {
      success: true,
      order: {
        _id: '1',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 54,
        ingredients: ['', '']
      } as TOrder,
      name: 'fake order'
    },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const responseData = {
    success: true,
    order: {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 54,
      ingredients: ['', '']
    } as TOrder,
    name: 'fake order'
  };

  const testCaseFour: IIngredients = {
    bun: {
      _id: '',
      name: '',
      type: 'bun',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    nonBunIngredients: [
      {
        id: '1',
        _id: '1',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: '2',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ],
    ingredients: [],
    ingredientsId: ['', ''],
    orderRequest: true,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const testCaseFive: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [
      {
        _id: '1',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '2',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ],
    ingredientsId: [],
    orderRequest: false,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const ingredients = [
    {
      _id: '1',
      name: '',
      type: 'main',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    {
      _id: '2',
      name: '',
      type: 'main',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  const testCaseSix: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [],
    ingredientsId: [],
    orderRequest: false,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [
      {
        _id: '1',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['', '']
      },
      {
        _id: '2',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 2,
        ingredients: ['', '']
      }
    ],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  const orders = [
    {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    },
    {
      _id: '2',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: ['', '']
    }
  ];

  const testCaseSeven: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: [],
    ingredientsId: [],
    orderRequest: false,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: {
      success: true,
      orders: [
        {
          _id: '1',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['', '']
        },
        {
          _id: '2',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 2,
          ingredients: ['', '']
        }
      ],
      total: 5400,
      totalToday: 5400
    }
  };

  const feeds = {
    success: true,
    orders: [
      {
        _id: '1',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['', '']
      },
      {
        _id: '2',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 2,
        ingredients: ['', '']
      }
    ],
    total: 5400,
    totalToday: 5400
  };

  const ingredientsTestEight = [
    {
      _id: '54',
      name: '',
      type: 'bun',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    {
      _id: '55',
      name: '',
      type: 'bun',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    {
      _id: '56',
      name: '',
      type: 'main',
      proteins: 54,
      fat: 54,
      carbohydrates: 54,
      calories: 54,
      price: 54,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  const testCaseEight: IIngredients = {
    bun: null,
    nonBunIngredients: [],
    ingredients: ingredientsTestEight,
    ingredientsId: [],
    orderRequest: false,
    responseData: { success: false, order: {} as TOrder, name: '' },
    orders: [],
    feeds: { success: false, orders: [], total: 0, totalToday: 0 }
  };

  it('pending order burger test', () => {
    const state = ingredientsSlice(testCaseOne, orderBurger.pending('', ''));
    expect(testCaseTwo).toEqual(state);
  });

  it('rejected order burger test', () => {
    const state = ingredientsSlice(
      testCaseOne,
      orderBurger.rejected(new Error(), '', '')
    );
    expect(testCaseOne).toEqual(state);
  });

  it('fulfilled order burger test', () => {
    const state = ingredientsSlice(
      testCaseFour,
      orderBurger.fulfilled(responseData, '', '')
    );
    expect(testCaseThree).toEqual(state);
  });

  it('fulfilled get ingredients', () => {
    const state = ingredientsSlice(
      testCaseOne,
      getIngredients.fulfilled(ingredients, '')
    );
    expect(testCaseFive).toEqual(state);
  });

  it('fulfilled get orders', () => {
    const state = ingredientsSlice(
      testCaseOne,
      getOrders.fulfilled(orders, '')
    );
    expect(testCaseSix).toEqual(state);
  });

  it('fulfilled get feeds', () => {
    const state = ingredientsSlice(testCaseOne, getFeeds.fulfilled(feeds, ''));
    expect(testCaseSeven).toEqual(state);
  });

  it('getElementById test', () => {
    const state = ingredientsSlice(testCaseEight, getIngredientByid('54'));
    expect(state.ingredientsId).toEqual(['54', '54']);
  });

  it('deleteIngredinetById test', () => {
    const state = ingredientsSlice(testCaseFour, deleteIngredientById('1'));
    expect(state.nonBunIngredients).toEqual([
      {
        id: '2',
        _id: '2',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]);
  });

  it('moveElement test', () => {
    const state = ingredientsSlice(
      testCaseFour,
      moveElement({ nonBunIngredientIndex: 0, toIndex: 1 })
    );
    expect(state.nonBunIngredients).toEqual([
      {
        id: '2',
        _id: '2',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '1',
        _id: '1',
        name: '',
        type: 'main',
        proteins: 54,
        fat: 54,
        carbohydrates: 54,
        calories: 54,
        price: 54,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]);
  });
});
