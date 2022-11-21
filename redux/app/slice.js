import {createSlice} from '@reduxjs/toolkit';
import {themeLight} from '../../config/theme';
export const settingStatusBarInitial = {
  backgroundColor: themeLight.colors.main,
  barStyle: 'light-content',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    isLoading: false,
    preloader: false,
    allMessages: {},
    contextMenu: {
      xPos: '100',
      yPos: '100',
      isShowMenu: false,
      messageId: 0,
      config: [],
    },
    messageEdit: {
      message: {},
      messageId: null,
    },
    dialogComponent: {
      isShow: false,
      title: '',
    },
    sheraMessages: [],
    selectedСhats: {},
    selectedMessages: {},
    settingStatusBar: settingStatusBarInitial,
  },
  reducers: {
    preloaderAction(state, {payload}) {
      state.preloader = payload;
    },
    setAllMessagesAction(state, {payload}) {
      state.allMessages = {
        ...state.allMessages,
        ...payload,
      };
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
    setSettingStatusBarAction(state, {payload}) {
      console.log(payload, 'payload');
      state.settingStatusBar = {...state.settingStatusBar, ...payload};
    },
  },
});

export default appSlice.reducer;
export const {
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
  setSettingStatusBarAction,
  setAllMessagesAction,
} = appSlice.actions;
