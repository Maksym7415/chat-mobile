import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userHistoryConversation: {
    success: {
      data: [],
      pagination: {
        allItems: 0,
        currentPage: 0,
      },
    },
    error: null,
  },
  conversationsList: {
    success: {
      data: [],
    },
    error: null,
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
  createConversation: {
    success: {
      data: [],
    },
    error: null,
  },
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
    conversationActionFail(state, {payload}) {
      [payload.name] = {
        error: payload.data,
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
    getUserConversationsActionRequest(state, {payload}) {
      state.conversationId = payload;
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
  extraReducers: builder => {},
});

export const {
  conversationActionSuccess,
  conversationActionFail,
  conversationUserHistoryActionRequest,
  lastConversationMessageAction,
  conversationAddNewMessage,
  clearLastMessage,
  getUserConversationsActionRequest,
  conversationTypeStateAction,
  updateConversationDataAction,
  createNewChatAction,
  clearConversationData,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
