import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
import {pathBackAuth} from '../../config/constants/urlBack';
import {authTokenAction, setLoginSingInAction} from './slice';

export const postLoginRequest = createAsyncThunk(
  'auth/postLoginRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...params.data,
      });
      params.cb && params.cb(response.data.verificationCode);
      dispatch(setLoginSingInAction(params.data.login));
      return response.data;
    } catch (error) {
      console.log(error.data, 'error');
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  },
);

export const postVerificationRequest = createAsyncThunk(
  'auth/postVerificationRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...params.data,
      });
      await dispatch(
        authTokenAction({
          token: response.data.accessToken,
        }),
      );
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  },
);

export const postSingUpRequest = createAsyncThunk(
  'auth/postSingUpRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...params.data,
      });
      dispatch(
        postLoginRequest({
          data: {
            login: params.data.login,
          },
          cb: params.cb(),
        }),
      );
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  },
);
