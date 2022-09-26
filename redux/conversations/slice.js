import {createSlice} from '@reduxjs/toolkit';
import * as requests from './requests';

const initialState = {
  userHistoryConversation: {
    data: [],
    pagination: {
      allItems: 0,
      currentPage: 0,
    },
  },
  conversationsList: [],
  conversations: {
    message: '',
    id: 0,
    sendDate: '',
  },
  currentChat: {
    id: 0,
  },
  lastMessages: {},
  currentConversationIdObject: {
    currentConversationId: 0,
  },
  conversationId: {
    id: 0,
    type: '',
  },
  conversationTypeState: {
    0: {
      isTyping: false,
      userId: 0,
      users: [
        {
          isTyping: false,
          firstName: '',
          userId: 0,
        },
      ],
    },
  },
  createConversation: [],
  opponentId: {
    id: 0,
  },
};

const conversationsSlice = createSlice({
  name: 'conversationsSlice',
  initialState,
  reducers: {
    conversationActionSuccess(state, {payload}) {
      [payload.name] = {
        success: payload.data,
        error: null,
      };
    },
    conversationUserHistoryActionRequest(state, {payload}) {
      state.currentChat = {
        id: payload.id,
      };
    },
    lastConversationMessageAction(state, {payload}) {
      state.searchChats = null;
    },
    conversationAddNewMessage(state, {payload}) {
      state.lastMessages = {
        [payload.id]: payload.message,
      };
      state.currentConversationIdObject = {
        currentConversationId: payload.id,
      };
    },
    clearLastMessage(state, {payload}) {
      state.lastMessages = {};
    },
    conversationTypeStateAction(state, {payload}) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload,
      };
    },
    updateConversationDataAction(state, {payload}) {
      state.conversationsList = {
        ...state.conversationsList,
        success: {
          ...state.conversationsList.success,
          data: payload,
        },
      };
    },
    createNewChatAction(state, {payload}) {
      state.opponentId = {
        id: payload.opponentId,
      };
    },
    clearConversationData(state, {payload}) {
      state.searchChats = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      requests.getUserConversationsRequest.fulfilled,
      (state, action) => {
        state.conversationsList = action.payload.data;
      },
    );
    builder.addCase(
      requests.getUserConversationsRequest.rejected,
      (state, action) => {
        state.login = {
          ...initialState[state.login],
          error: action.payload,
        };
      },
    );
    builder.addCase(
      requests.getConversationUserHistoryRequest.fulfilled,
      (state, action) => {
        state.userHistoryConversation = {
          data: action.payload?.data,
          pagination: action.payload?.pagination,
        };
      },
    );
  },
});

export const {
  conversationActionSuccess,
  conversationActionFail,
  conversationUserHistoryActionRequest,
  lastConversationMessageAction,
  conversationAddNewMessage,
  clearLastMessage,
  conversationTypeStateAction,
  updateConversationDataAction,
  createNewChatAction,
  clearConversationData,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
