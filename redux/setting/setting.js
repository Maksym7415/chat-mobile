import {createSlice} from '@reduxjs/toolkit';

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState: {
    error: {},
    isLangSet: false,
    lang: 'en',
  },
  reducers: {
    setLangAction(state, {payload}) {
      state.lang = payload;
      state.isLangSet = true;
    },
  },
});

export default settingSlice.reducer;
export const {setLangAction} = settingSlice.actions;
