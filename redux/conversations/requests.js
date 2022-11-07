import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
import {pathBackConversations} from '../../config/constants/urlBack';

export const getUserConversationsRequest = createAsyncThunk(
  'conversations/getUserConversationsRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.get(
        pathBackConversations.getUserConversations,
      );
      params?.cb && params.cb();
      return response.data.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);

export const getConversationUserHistoryRequest = createAsyncThunk(
  'conversations/getConversationUserHistoryRequest',
  async (params, {dispatch}) => {
    try {
      const response = await API.get(
        `${pathBackConversations.conversationHistory}/${params.data.id}?offset=${params.data.offset}`,
      );
      params?.cb && params.cb(response.data);
      return {data: response.data.data, pagination: response.data.pagination};
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  },
);
