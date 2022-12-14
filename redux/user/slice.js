import {createSlice} from '@reduxjs/toolkit';
import * as requests from './requests';

// avatars: [
//   {
//     id: 0,
//     fileName: '',
//     defaultAvatar: true,
//     fkUserId: 0,
//   },
// ],

const initialState = {
  userInfo: {
    id: 0,
    login: '',
    firstName: '',
    lastName: '',
    tagName: '',
    fullName: '',
    status: '',
    userAvatar: '',
    userCreationTime: '',
    userUpdateTime: '',
    userLastTimeOnline: '',
    Roles: [],
  },
  setMainPhoto: {
    success: {
      data: '',
    },
    error: null,
  },
  avatars: [],
  upload: {
    success: {
      data: '',
    },
    error: null,
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setLoginSingInAction(state, {payload}) {
      state.loginSingIn = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      requests.getUserProfileDataRequest.fulfilled,
      (state, action) => {
        state.userInfo = action.payload;
      },
    );
    builder.addCase(requests.getUserAvatars.fulfilled, (state, action) => {
      state.avatars = action.payload;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
