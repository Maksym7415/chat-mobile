import {createSlice} from '@reduxjs/toolkit';
import * as requests from './requests';
import {jwtdecode} from '../../helpers';

const initalTokenPayload = {
  role: '',
  login: '',
  userAgent: '',
  firstName: '',
  userId: 0,
  type: '',
  iat: 0,
  exp: 0,
};

const initialState = {
  loginSingIn: null,
  verificationCode: null,
  refreshToken: '',
  tokenPayload: initalTokenPayload,
  headers: {accessToken: ''},
  isLogout: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authTokenAction(state, {payload}) {
      let payloadLocal = initalTokenPayload;
      try {
        payloadLocal = jwtdecode(payload.token);
      } catch (e) {}
      state.tokenPayload = payloadLocal;
    },
    setAuthHedersAction(state, {payload}) {
      state.headers = payload;
    },
    setIsLogoutAction(state, {payload}) {
      state.isLogout = true;
    },
    setLoginSingInAction(state, {payload}) {
      state.loginSingIn = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(requests.postLoginRequest.fulfilled, (state, action) => {
      state.verificationCode = action.payload.verificationCode;
    });
    builder.addCase(
      requests.postVerificationRequest.fulfilled,
      (state, action) => {
        state.headers.accessToken = action.payload;
      },
    );
  },
});

export const {authTokenAction, setAuthHedersAction, setLoginSingInAction} =
  authSlice.actions;

export default authSlice.reducer;
