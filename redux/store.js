import {configureStore} from '@reduxjs/toolkit';
// import {reduxBatch} from '@manaflair/redux-batch';
import rootReducer from './rootReducer';

const reducer = rootReducer;

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [reduxBatch],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
