import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherReducer';
import citiesReducer from './citiesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	weather: weatherReducer,
	cities: citiesReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
