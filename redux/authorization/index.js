import {createSlice} from '@reduxjs/toolkit';
// import * as thunks from './thunks';
// import {socket} from '../../../core/mainLayout/initSockets';

const initialState = {
  login: {
    success: {
      status: false,
    },
    error: null,
  },
  signUp: {
    success: {
      email: '',
    },
    error: null,
  },
  verification: {
    success: {
      accessToken: '',
      refreshToken: '',
    },
    error: null,
  },
  tokenPayload: {
    role: '',
    login: '',
    userAgent: '',
    userId: 0,
    firstName: '',
    type: '',
    iat: 0,
    exp: 0,
  },
  logout: {
    isLogout: false,
  },
};

const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {
    loginAction(state, {payload}) {
      state.searchChats = null;
    },
    signUpAction(state, {payload}) {
      state.searchChats = null;
    },
    checkVerificationCodeAction(state, {payload}) {
      state.searchChats = null;
    },
    requestFailAction(state, {payload}) {
      state.searchChats = null;
    },
    actionTokenAction(state, {payload}) {
      state.searchChats = null;
    },
    actionLogoutAction(state, {payload}) {
      state.searchChats = null;
    },
  },
  extraReducers: builder => {},
});

export const {
  addNewMessage,
  setMessageSeen,
  addNewChat,
  clearSearch,
  setCurrentChat,
  clearCurrentChat,
  clearSearchDropDown,
  updateUnreadNumber,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
