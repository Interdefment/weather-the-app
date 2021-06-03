export interface OpenWeatherCoords {
	lon: number;
	lat: number;
}

export interface WeatherDesc {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface DailyForecast {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: {
		day: number;
		eve: number;
		max: number;
		min: number;
		morn: number;
		night: number;
	};
	feels_like: {
		day: number;
		eve: number;
		morn: number;
		night: number;
	};
	humidity: number;
	pressure: number;
	dew_point: number;
	wind_speed: number;
	wind_gust?: number;
	wind_deg: number;
	clouds: number;
	uvi: number;
	visibility: number;
	pop: number;
	rain?: number;
	snow?: number;
	weather: [WeatherDesc];
}

export interface CurrentWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	clouds: number;
	uvi: number;
	visibility: number;
	wind_speed: number;
	wind_gust?: number;
	wind_deg: number;
	rain?: {
		'1h': number;
	};
	snow?: {
		'1h': number;
	};
	weather: [WeatherDesc];
}

export interface HourlyForecast {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_gust?: number;
	wind_deg: number;
	pop: number;
	rain?: {
		'1h': number;
	};
	snow?: {
		'1h': number;
	};
	weather: [WeatherDesc];
}

export type City = {
	name: string;
	coord: OpenWeatherCoords;
	country: string;
	id: string;
	state?: string;
	cityid?: string;
	userId?: string;
	comment?: string;
};

export type WeatherTableData = {
	id: string;
	title: string;
	weather: {
		temperature: number;
		windSpeed: number;
		weatherCode: string;
		icon: string;
	};
};

export type Entity<T> = {
	id: string;
	data: T;
}

export type User = {
	username: string;
	id: string;
}