import {
  TRegisterData,
  getUserApi,
  registerUserApi,
  TAuthResponse,
  loginUserApi,
  TLoginData,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

export const getUser = createAsyncThunk('user/checkAuth', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    const { refreshToken, accessToken, user } = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    return { refreshToken, accessToken, user };
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

interface IUser {
  isLoading: boolean;
  isAuthorized: boolean;
  data: TAuthResponse;
  success: boolean;
  logout: boolean;
}

const initialState: IUser = {
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
      .addCase(loginUser.fulfilled, (state) => {
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
