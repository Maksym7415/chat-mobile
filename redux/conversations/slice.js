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
  conversationsList: {
    data: {},
  },
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
    clearLastMessage(state, {payload}) {
      state.lastMessages = {};
    },
    conversationTypeStateAction(state, {payload}) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload,
      };
    },
    updateConversationListAction(state, {payload}) {
      state.conversationsList.data = {
        ...state.conversationsList.data,
        ...payload,
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
    setConversationIdAction(state, {payload}) {
      state.conversationId = {...state.conversationId, ...payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(
      requests.getUserConversationsRequest.fulfilled,
      (state, action) => {
        state.conversationsList.data = action.payload.data;
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
  clearLastMessage,
  conversationTypeStateAction,
  createNewChatAction,
  clearConversationData,
  updateConversationListAction,
  setConversationIdAction,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
