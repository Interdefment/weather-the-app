import dayjs from 'dayjs';
import { DailyForecast, HourlyForecast, WeatherTableData } from '../types';

export const getHourlyWeatherTable = (
	data: HourlyForecast[]
): WeatherTableData[] => {
	return data.map((item) => ({
		title: dayjs.unix(item.dt).utcOffset(0).format('HH:mm'),
		id: item.dt.toString(),
		weather: {
			temperature: item.temp,
			weatherCode: item.weather[0].description,
			windSpeed: item.wind_speed,
			icon: item.weather[0].icon,
		},
	}));
};

export const getDailyWeatherTable = (
	data: DailyForecast[]
): WeatherTableData[] => {
	return data.map((day) => ({
		title: dayjs.unix(day.dt).format('DD/MM'),
		id: day.dt.toString(),
		weather: {
			temperature: day.temp.day,
			weatherCode: day.weather[0].description,
			windSpeed: day.wind_speed,
			icon: day.weather[0].icon,
		},
	}));
};

export const setWeatherTimezoneOffset = (
	data: HourlyForecast[],
	offset: number
): HourlyForecast[] =>
	data.map((item: HourlyForecast) => ({
		...item,
		dt: item.dt + offset,
	}));

export const logHourlyForecast = (data: HourlyForecast[], offset?: number) => {
	data.forEach((item) =>
		console.log(
			dayjs.unix(item.dt).utcOffset(0).format('DD/MM HH:mm'),
			offset ? dayjs.unix(item.dt).utcOffset(offset).format('DD/MM HH:mm') : ''
		)
	);
};
export const filterWeatherByDay = (
	data: HourlyForecast[],
	day: number
): HourlyForecast[] =>
	data.filter(
		(item: HourlyForecast) => dayjs.unix(item.dt).utcOffset(0).date() === day
	);

export const concatHourlyWeather = (
	history: HourlyForecast[],
	forecast: HourlyForecast[]
) => {
	const lastHistoryUnit = history[history.length - 1];
	const firstForecastUnit = forecast[0];
	if (!lastHistoryUnit || !firstForecastUnit) {
		if (lastHistoryUnit) {
			return history;
		}
		if (firstForecastUnit) {
			return forecast;
		}
		return [];
	}
	if (lastHistoryUnit.dt === firstForecastUnit.dt) {
		history.splice(-1);
	}
	return history.concat(forecast);
};

export const getForecastForDay = (
	weather: HourlyForecast[],
	date: dayjs.Dayjs,
	timezoneOffset: number
): HourlyForecast[] => {
	let data = setWeatherTimezoneOffset(weather, timezoneOffset);
	const day = date.utcOffset(timezoneOffset / 60).date();
	data = filterWeatherByDay(data, day);
	return data;
};
