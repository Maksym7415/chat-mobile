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

export const putUpdateProfileRequest = createAsyncThunk(
  'user/putUpdateProfileRequest',
  async (params, {dispatch}) => {
    try {
      console.log(params, 'params');
      const response = await API.put(pathBackUser.updateProfile, {
        ...params.data,
      });
      params?.cb && params.cb(response.data);
      console.log(response, 'response');
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);
