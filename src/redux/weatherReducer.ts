import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { makeOneCall } from '../api/weather.api';
import { City, CurrentWeather, DailyForecast, HourlyForecast } from '../types';
import { AppThunk } from './store';

interface WeatherState {
	city?: City;
	error: string;
	current?: CurrentWeather;
	today: HourlyForecast[];
	tomorrow: HourlyForecast[];
	week: DailyForecast[];
	loading: boolean;
}

const getInitialState = (): WeatherState => {
	return {
		week: [],
		today: [],
		tomorrow: [],
		error: '',
		loading: true,
	};
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState: getInitialState(),
	reducers: {
		setWeatherStatus: (
			state,
			action: PayloadAction<{
				loading: boolean;
				error: string;
			}>
		) => {
			state.loading = action.payload.loading;
			state.error = action.payload.error;
		},
		setCity: (state, action: PayloadAction<City>) => {
			state.city = action.payload;
		},
		setWeatherLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setWeatherError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setWeatherData: (
			state,
			action: PayloadAction<{
				current: CurrentWeather;
				today: HourlyForecast[];
				tomorrow: HourlyForecast[];
				week: DailyForecast[];
			}>
		) => {
			state.today = action.payload.today;
			state.tomorrow = action.payload.tomorrow;
			state.week = action.payload.week;
			state.current = action.payload.current;
		},
		setCityWeatherData: (
			state,
			action: PayloadAction<{
				city: City;
				current: CurrentWeather;
				today: HourlyForecast[];
				tomorrow: HourlyForecast[];
				week: DailyForecast[];
			}>
		) => {
			state.today = action.payload.today;
			state.tomorrow = action.payload.tomorrow;
			state.week = action.payload.week;
			state.current = action.payload.current;
			state.city = action.payload.city;
			state.loading = false;
		},
	},
});

export const {
	setCity,
	setWeatherError,
	setWeatherData,
	setCityWeatherData,
	setWeatherStatus,
	setWeatherLoading,
} = weatherSlice.actions;

export default weatherSlice.reducer;

export const loadWeatherData = (city: City): AppThunk => async (dispatch) => {
	dispatch(
		setWeatherStatus({
			loading: true,
			error: '',
		})
	);
	try {
		const { today, tomorrow, week, current } = await makeOneCall(city, {
			today: true,
			tomorrow: true,
			week: true,
			current: true,
		});
		if (today && tomorrow && week && current) {
			dispatch(
				setCityWeatherData({
					today,
					tomorrow,
					week,
					current,
					city,
				})
			);
		}
	} catch (error) {
		dispatch(
			setWeatherStatus({
				loading: false,
				error: 'Unable to load weather forecast...',
			})
		);
	}
};
