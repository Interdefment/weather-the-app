import React from 'react';
import { Col, Row, Typography, Button, Spin } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import dayjs from 'dayjs';

import styles from './CurrentCityWidget.module.css';
import classNames from 'classnames';
import { addCityThunk } from '../../redux/citiesReducer';

type CityWidgetProps = {
	className?: string;
	lat?: number;
	lng?: number;
	text?: string;
};

export const CurrentCityWidget: React.FC<CityWidgetProps> = ({ className }) => {
	const { isSaved, weather, city, error, userId } = useSelector(
		(state: RootState) => ({
			isSaved: Boolean(
				state.cities.saved.find((city) => city.id === state.weather.city?.id)
			),
			weather: state.weather.current,
			city: state.weather.city,
			error: state.weather.error,
			userId: state.auth.user?.uid,
		})
	);
	const dispatch = useDispatch();

	const saveCity = () => {
		if (city && userId) {
			dispatch(addCityThunk({ city, userId }));
		}
	};

	if (!weather || !city) {
		return (
			<Row
				className={classNames(styles.CurrentCityWidget, className)}
				justify="center"
			>
				<Col>
					{error ? (
						<Typography.Title level={3}>{error}</Typography.Title>
					) : (
						<Spin size="large" />
					)}
				</Col>
			</Row>
		);
	}

	const time = dayjs.unix(weather.dt).utcOffset(0).format('DD/MM H:mm');

	return (
		<div className={styles.CurrentCityWidget}>
			<Typography.Title level={4}>{weather.temp}&#8451;</Typography.Title>
			{!isSaved && userId && (
				<Button
					type="primary"
					size="large"
					shape="circle"
					icon={<FaPlus className={styles.CurrentCityWidget_addButton_icon} />}
					className={styles.CurrentCityWidget_addButton}
					onClick={saveCity}
				/>
			)}
			<Typography.Text type="secondary">
				{city.name}, {city.country} &mdash; {time}
			</Typography.Text>
			<Typography.Paragraph className={styles.CurrentCityWidget_weatherInfo}>
				{weather.weather[0].description}. Wind - {weather.wind_speed} m/s
			</Typography.Paragraph>
		</div>
	);
};
