import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (params, {dispatch}) => {
    try {
      const response = await API.post('/signIn', {
        ...params.data,
      });
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);

export const verificationThunk = createAsyncThunk(
  'auth/verificationThunk',
  async (params, {dispatch}) => {
    try {
      const response = await API.post('/checkVerificationCode', {
        ...params.data,
      });
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);

export const singUpThunk = createAsyncThunk(
  'auth/singUpThunk',
  async (params, {dispatch}) => {
    try {
      const response = await API.post('/signUp', {
        ...params.data,
      });
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);
