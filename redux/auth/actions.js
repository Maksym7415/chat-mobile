import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLangAction} from '../setting';
import {setIsLogoutAction} from '../auth';

export const onLogOut = () => async (dispatch, getState) => {
  dispatch(setLangAction('en'));
  dispatch(setIsLogoutAction());
};
