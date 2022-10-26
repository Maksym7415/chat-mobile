import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
import {pathBackUser} from '../../config/constants/urlBack';

export const getUserProfileDataRequest = createAsyncThunk(
  'user/getUserProfileDataRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.get(pathBackUser.getUserProfileData);
      params?.cb && params.cb();
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);

export const getUserAvatars = createAsyncThunk(
  'user/getUserAvatars',
  async (params, {dispatch}) => {
    try {
      const response = await API.get(pathBackUser.getAvatars);
      params?.cb && params.cb();
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);
