import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authSuccessAction, authFailAction} from './index';

export const loginThunk = createAsyncThunk(
  'authorization/loginThunk',
  async (params, {dispatch}) => {
    try {
      console.log(';;;');
      const response = await axios.post('http://localhost:3000/api/signIn', {
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
  'authorization/verificationThunk',
  async (params, {dispatch}) => {
    try {
      const response = await axios.post('/checkVerificationCode', {
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
  'authorization/singUpThunk',
  async (params, {dispatch}) => {
    try {
      const response = await axios.post('/signUp', {
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
