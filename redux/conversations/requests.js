import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
import {pathBackConversations} from '../../config/constants/urlBack';

export const getUserConversationsRequest = createAsyncThunk(
  'conversations/getUserConversationsRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.get(
        pathBackConversations.getUserConversations,
        {
          ...params.data,
        },
      );
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);
