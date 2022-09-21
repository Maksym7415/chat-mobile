import {createSlice} from '@reduxjs/toolkit';
import * as thunks from './thunks';
import jwtDecode from '../../utils/jwtdecode';

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
  headers: {accessToken: ''},
  isLogout: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authTokenAction(state, {payload}) {
      let payloadLocal = {
        role: '',
        login: '',
        userAgent: '',
        firstName: '',
        userId: 0,
        type: '',
        iat: 0,
        exp: 0,
      };
      try {
        payloadLocal = jwtDecode(payload.token);
      } catch (e) {
        // console.log(e);
      }
      return {
        ...state,
        tokenPayload: payloadLocal,
      };
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
    setAuthHedersAction(state, {payload}) {
      state.headers = payload;
    },
    setIsLogoutAction(state, {payload}) {
      state.isLogout = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(thunks.loginThunk.fulfilled, (state, action) => {
      state.login = {
        success: action.payload,
        error: null,
      };
      state.logout = {
        isLogout: false,
      };
    });
    builder.addCase(thunks.loginThunk.rejected, (state, action) => {
      state.login = {
        ...initialState[state.login],
        error: action.payload,
      };
    });
    builder.addCase(thunks.verificationThunk.fulfilled, (state, action) => {
      state.verification = {
        success: action.payload,
        error: null,
      };
      state.logout = {
        isLogout: false,
      };
    });
    builder.addCase(thunks.verificationThunk.rejected, (state, action) => {
      state.verification = {
        ...initialState[state.verification],
        error: action.payload,
      };
    });
    builder.addCase(thunks.singUpThunk.fulfilled, (state, action) => {
      state.signUp = {
        success: action.payload,
        error: null,
      };
      state.logout = {
        isLogout: false,
      };
    });
    builder.addCase(thunks.singUpThunk.rejected, (state, action) => {
      state.signUp = {
        ...initialState[state.signUp],
        error: action.payload,
      };
    });
  },
});

export const {authTokenAction, setAuthHedersAction} = authSlice.actions;

export default authSlice.reducer;
