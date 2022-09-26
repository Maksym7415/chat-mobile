import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './app';
import authSlice from './auth';
import settingSlice from './setting';
import conversationsSlice from './conversations';

export default combineReducers({
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
});
