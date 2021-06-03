import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useLocation } from 'react-router';
import { MapWidget } from '../components/GoogleMap/GoogleMap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { CurrentCityWidget } from '../components/Widgets/CurrentCityWidget';
import { useWindowDimensions } from '../hooks/window';

import { WeatherTable } from '../components/Widgets/WeatherTable';
import { getHourlyWeatherTable } from '../helpers/weather';

import classNames from 'classnames';
import styles from './TodayPage.module.css';

export const TodayPage: React.FC = () => {
	const { city, today, tomorrow, loading, current } = useSelector(
		(state: RootState) => ({
			today: getHourlyWeatherTable(state.weather.today),
			tomorrow: getHourlyWeatherTable(state.weather.tomorrow),
			loading: state.weather.loading,
			current: state.weather.current,
			city: state.weather.city,
		})
	);

	const path = useLocation().pathname.split('/')[1];
	const data = path === 'today' ? today : path === 'tomorrow' ? tomorrow : [];

	const { width } = useWindowDimensions();
	const isMobile = width < 768;
	const widgetSpan = Math.ceil((400 / width) * 24);

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<CurrentCityWidget />
			</Col>
			<Col span={isMobile ? 24 : widgetSpan}>
				{loading ? (
					<Skeleton active />
				) : (
					<WeatherTable
						data={data}
						vertical={!isMobile}
						titleText="Time"
						className="BlueGradientBox"
					/>
				)}
			</Col>
			<Col span={isMobile ? 24 : 24 - widgetSpan}>
				<div
					className={classNames({ [styles.TodayPage_mapWrapper]: !isMobile })}
				>
					<MapWidget cityWeather={current} city={city} absolute={!isMobile} />
				</div>
			</Col>
		</Row>
	);
};
