import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './app';
import authSlice from './auth';
import settingSlice from './setting';
import conversationsSlice from './conversations';
import userSlice from './user';
import snackBarSlice from '../components/snackbar/slice';

export default combineReducers({
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  snackBarSlice,
});
