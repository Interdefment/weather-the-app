import React, { useState } from 'react';
import { Col, Input, Row, Skeleton, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { useEffect } from 'react';
import { CurrentWeather } from '../types';
import { makeOneCall } from '../api/weather.api';
import { useHistory, useParams } from 'react-router';
import { MapWidget } from '../components/GoogleMap/GoogleMap';
import { FaTimes } from 'react-icons/fa';
import { deleteCity, updateCityComment } from '../api/firebase.api';

import styles from './CityPage.module.css';
import { deleteCityThunk } from '../redux/citiesReducer';

export const CityPage: React.FC = () => {
	const { cityid } = useParams<{ cityid: string }>();
	const history = useHistory();

	const { city } = useSelector((state: RootState) => ({
		city: state.cities.saved.find((city) => city.cityid === cityid),
	}));
	const [weather, setWeather] = useState<CurrentWeather | undefined>(undefined);
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const onDeleteCity = async () => {
		if (city?.cityid) {
			dispatch(deleteCityThunk(city.cityid));
		}
		history.goBack();
	};

	useEffect(() => {
		const fetchData = async () => {
			if (!city) {
				return;
			}
			try {
				const { current } = await makeOneCall(city, { current: true });
				setWeather(current);
			} catch (error) {
				setError('Unable to load weather for the city...');
			}
		};
		fetchData();
	}, [city]);

	if (!city) {
		return (
			<div className={styles.CityPage}>
				<Typography.Title level={2}>City not found</Typography.Title>
			</div>
		);
	}

	return (
		<div className={styles.CityPage}>
			<FaTimes
				size={24}
				onClick={onDeleteCity}
				className={styles.CityPage_deleteButton}
				title="Delete from saved"
			/>
			<Typography.Title level={2} className={styles.CityPage_title}>
				{city.name}, {city.country}
			</Typography.Title>
			{weather ? (
				<div>
					<Typography.Title level={4}>
						{weather.temp}&#8451;{' '}
						<small>(feels like {weather.feels_like}&#8451;)</small>
					</Typography.Title>
					<p>{weather.weather[0].description}</p>
					<p>Humidity: {weather.humidity}%</p>
					<Typography.Paragraph>
						Wind: {weather.wind_speed} m/s
					</Typography.Paragraph>
					<p>Visibility: {weather.visibility} m</p>
				</div>
			) : (
				<Row justify="center">
					<Col className={styles.CityPage_loaderContainer}>
						{error ? (
							<Typography.Title level={4}>{error}</Typography.Title>
						) : (
							<Skeleton active />
						)}
					</Col>
				</Row>
			)}
			{city.userId && (
				<Input.TextArea
					placeholder="Comment"
					value={city.comment}
					onChange={(event) => {
						if (city.cityid) {
							updateCityComment(city.cityid, event.target.value);
						}
					}}
				/>
			)}
			<MapWidget city={city} />
		</div>
	);
};
