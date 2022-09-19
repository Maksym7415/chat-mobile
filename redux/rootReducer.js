import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './app';
import authorizationSlice from './authorization';

export default combineReducers({
  appSlice,
  authorizationSlice,
});
