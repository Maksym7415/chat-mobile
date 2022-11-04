import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  options: {
    message: '',
    open: false,
    severity: '',
    timeout: 0,
    wrapperStyle: {},
    style: {},
    styleText: {},
    action: {
      label: '',
      onPress: () => {},
    },
    content: <></>,
  },
};

const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    getSnackBar(state, {payload}) {
      state.options = payload;
    },
  },
});

export default snackBarSlice.reducer;
export const {getSnackBar} = snackBarSlice.actions;
