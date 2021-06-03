import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentCityWidget } from '../components/Widgets/CurrentCityWidget';
import { RootState } from '../redux/rootReducer';

import { WeatherTable } from '../components/Widgets/WeatherTable';
import { getDailyWeatherTable } from '../helpers/weather';

export const WeekPage: React.FC = () => {
	const { data } = useSelector((state: RootState) => ({
		data: getDailyWeatherTable(state.weather.week),
	}));

	return (
		<div>
			<CurrentCityWidget />
			<WeatherTable data={data} className="BlueGradientBox" />
		</div>
	);
};
