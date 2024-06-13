import {
  TRegisterData,
  getUserApi,
  registerUserApi,
  TAuthResponse,
  loginUserApi,
  TLoginData,
  logoutApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const getUser = createAsyncThunk('user/checkAuth', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

export interface IUser {
  isLoading: boolean;
  isAuthorized: boolean;
  data: TAuthResponse;
  success: boolean;
  logout: boolean;
}

export const initialState: IUser = {
  isLoading: true,
  isAuthorized: false,
  data: {
    success: false,
    refreshToken: '',
    accessToken: '',
    user: { email: '', name: '' }
  },
  success: false,
  logout: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLogout: (state) => {
      state.logout = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(getUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthorized = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.success = false;
        state.isAuthorized = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.isAuthorized = true;
      })
      .addCase(logout.rejected, (state) => {
        state.logout = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logout = true;
        state.isAuthorized = false;
      });
  }
});

export const { resetLogout } = userSlice.actions;

export default userSlice.reducer;
