import userSlice, {
  IUser,
  getUser,
  loginUser,
  logout,
  registerUser,
  resetLogout
} from '../slices/userSlice';

describe('userSlice tests', () => {
  const testCaseOne: IUser = {
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

  const responseData = {
    success: true,
    refreshToken: 'fakeRefreshToken',
    accessToken: 'fakeAccessToken',
    user: { email: 'test@mail.com', name: 'test' }
  };

  it('reset logout test', () => {
    const state = userSlice(testCaseOne, resetLogout());
    expect(state.logout).toBe(false);
  });

  it('pending getUser test', () => {
    const state = userSlice(testCaseOne, getUser.pending(''));
    expect(state.isLoading).toBe(true);
  });

  it('rejected getUser test', () => {
    const state = userSlice(testCaseOne, getUser.rejected(new Error(), ''));
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(false);
  });

  it('fulfilled getUser test', () => {
    const state = userSlice(
      testCaseOne,
      getUser.fulfilled(
        { success: true, user: { email: 'fake@mail.com', name: 'fake' } },
        ''
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthorized).toBe(true);
  });

  it('fulfilled registerUser test', () => {
    const state = userSlice(
      testCaseOne,
      registerUser.fulfilled(responseData, '', {
        email: 'fake@mail.com',
        name: 'test',
        password: 'password'
      })
    );
    expect(state.data).toEqual(responseData);
  });

  it('rejected loginUser test', () => {
    const state = userSlice(
      testCaseOne,
      loginUser.rejected(new Error(), '', {
        email: 'fake@mail.com',
        password: 'password'
      })
    );
    expect(state.success).toBe(false);
    expect(state.isAuthorized).toBe(false);
  });

  it('fulfilled loginUser test', () => {
    const state = userSlice(
      testCaseOne,
      loginUser.fulfilled(responseData, '', {
        email: 'fake@mail.com',
        password: 'password'
      })
    );
    expect(state.success).toBe(true);
    expect(state.isAuthorized).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('rejected logout test', () => {
    const state = userSlice(testCaseOne, logout.rejected(new Error(), ''));
    expect(state.logout).toBe(false);
  });

  it('fulfilled logout test', () => {
    const state = userSlice(
      testCaseOne,
      logout.fulfilled({ success: true }, '')
    );
    expect(state.logout).toBe(true);
    expect(state.isAuthorized).toBe(false);
  });
});
