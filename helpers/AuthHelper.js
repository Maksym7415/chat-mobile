import {store} from '../redux/store';

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    const {
      headers: {'access-token': accessToken},
    } = state.authSlice;
    return {
      'access-token': accessToken,
    };
  } catch (error) {}
};
