import axios from 'axios';
import dayjs from 'dayjs';
import { City, CurrentWeather, DailyForecast, HourlyForecast } from '../types';
import { OPENWEATHER_API_KEY } from '../constants';
import {
	concatHourlyWeather,
	filterWeatherByDay,
	getForecastForDay,
	setWeatherTimezoneOffset,
} from '../helpers/weather';

type OneCallOptions = {
	today?: boolean;
	tomorrow?: boolean;
	week?: boolean;
	current?: boolean;
};

type OneCallResponse = {
	today?: HourlyForecast[];
	tomorrow?: HourlyForecast[];
	week?: DailyForecast[];
	current?: CurrentWeather;
};

const loadHistoryWeather = async (
	city: City,
	date: dayjs.Dayjs,
	callback?: (data: HourlyForecast[], timezoneOffset: number) => void
): Promise<HourlyForecast[]> => {
	const params = {
		appid: OPENWEATHER_API_KEY,
		units: 'metric',
		lat: city.coord.lat,
		lon: city.coord.lon,
		exclude: 'minutely,alerts,current',
		dt: date.unix() - 10, // Иногда вылетает ошибка запрос к истории "запрос из будующего"
	};
	const result = await axios({
		method: 'GET',
		url: 'https://api.openweathermap.org/data/2.5/onecall/timemachine',
		params,
	});
	const data = setWeatherTimezoneOffset(
		result.data.hourly,
		result.data.timezone_offset
	);
	callback && callback(data, result.data.timezone_offset);
	return data;
};

const getTodayHistoryWeather = async (city: City) => {
	const now = dayjs();
	// Необходимо для некоторых городов т.к. openweatermaps отдает данные по UTC
	let yesterdayData: HourlyForecast[] = [];
	let todayData: HourlyForecast[] = [];

	await Promise.all([
		loadHistoryWeather(
			city,
			now.utcOffset(0).add(-1, 'day'),
			(data, timezoneOffsetSeconds) => {
				yesterdayData = filterWeatherByDay(
					data,
					now.utcOffset(timezoneOffsetSeconds / 60).date()
				);
			}
		),
		loadHistoryWeather(
			city,
			now.utcOffset(0),
			(data, timezoneOffsetSeconds) => {
				todayData = filterWeatherByDay(
					data,
					now.utcOffset(timezoneOffsetSeconds / 60).date()
				);
			}
		),
	]);

	const fullHistory = concatHourlyWeather(yesterdayData, todayData);

	return fullHistory;
};

export const makeOneCall = async (
	city: City,
	options: OneCallOptions
): Promise<OneCallResponse> => {
	const params = {
		appid: OPENWEATHER_API_KEY,
		units: 'metric',
		lat: city.coord.lat,
		lon: city.coord.lon,
		exclude: 'minutely,alerts',
	};
	const result = await axios({
		method: 'GET',
		url: 'https://api.openweathermap.org/data/2.5/onecall',
		params,
	});

	const response: OneCallResponse = {};

	if (options.current) {
		response.current = {
			...result.data.current,
			dt: dayjs().unix() + result.data.timezone_offset,
		};
	}

	if (options.today) {
		const now = dayjs();
		const history = await getTodayHistoryWeather(city);
		const foreacast = getForecastForDay(
			result.data.hourly,
			now,
			result.data.timezone_offset
		);
		response.today = concatHourlyWeather(history, foreacast).filter(
			(item) => (dayjs.unix(item.dt).utcOffset(0).hour() - 1) % 3 === 0
		);
	}

	if (options.tomorrow) {
		const tommorow = dayjs().add(1, 'day');
		response.tomorrow = getForecastForDay(
			result.data.hourly,
			tommorow,
			result.data.timezone_offset
		).filter((item) => (dayjs.unix(item.dt).utcOffset(0).hour() - 1) % 3 === 0);
	}

	if (options.week) {
		response.week = result.data.daily.slice(0, 7);
	}

	return response;
};
