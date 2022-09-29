import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    isLoading: false,
    preloader: false,
    contextMenu: {
      xPos: '100',
      yPos: '100',
      isShowMenu: false,
      messageId: 0,
      config: [],
    },
    messageEdit: {
      isEdit: false,
      isDelete: false,
      messageId: null,
    },
    dialogComponent: {
      isShow: false,
      title: '',
    },
    sheraMessages: [],
    selectedСhats: {},
    selectedMessages: {},
  },
  reducers: {
    preloaderAction(state, {payload}) {
      state.preloader = payload;
    },
    contextMenuAction(state, {payload}) {
      state.contextMenu = payload;
    },
    editMessageAction(state, {payload}) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    setLanguageAction(state, {payload}) {
      state.lang = payload;
    },
    deleteMessageAction(state, {payload}) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    shareMessageAction(state, {payload}) {
      state.sheraMessages = payload;
    },
    showDialogAction(state, {payload}) {
      state.dialogComponent = payload;
    },
    hideDialogAction(state, {payload}) {
      state.dialogComponent = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    },
    setSelectedСhatsAction(state, {payload}) {
      state.selectedСhats = payload;
    },
    setSelectedMessagesAction(state, {payload}) {
      state.selectedMessages = payload;
    },
  },
});

export default appSlice.reducer;
const {
  preloaderAction,
  contextMenuAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  showDialogAction,
  hideDialogAction,
  setIsLoading,
  setSelectedСhatsAction,
  setSelectedMessagesAction,
} = appSlice.actions;
export {
  preloaderAction,
  contextMenuAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  showDialogAction,
  hideDialogAction,
  setIsLoading,
  setSelectedСhatsAction,
  setSelectedMessagesAction,
};
