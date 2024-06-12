import store, { rootReducer } from '../store';
import { initialState as ingredientsState } from '../slices/ingredientsSlice';
import { initialState as userState } from '../slices/userSlice';

describe('rootReducer initialization', () => {
  it('should initialize root reducer correctly', () => {
    const initialReducerStore = store.getState();
    const state = rootReducer(undefined, { type: '@@INIT' });
		
    expect(state.ingredients).toEqual(ingredientsState);
    expect(state.user).toEqual(userState);
    expect(initialReducerStore).not.toEqual({});
  });
});
