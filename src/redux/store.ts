import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { createLogger } from 'redux-logger'

const logger = createLogger();

const store = configureStore({
	reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
