import React from 'react';

import styles from './WeatherTable.module.css';
import classNames from 'classnames';
import { WeatherTableData } from '../../types';

type WeatherProps = {
	data: WeatherTableData[];
	vertical?: boolean;
	titleText?: string;
	className?: string;
};

export const WeatherTable: React.FC<WeatherProps> = ({
	data,
	vertical,
	titleText,
	className,
}) => {
	const renderTitles = () =>
		data.map((day) => (
			<div
				key={`title-${day.id}`}
				className={classNames(
					styles.WeatherTable_cell,
					styles.WeatherTable_cell___title
				)}
			>
				{day.title}
			</div>
		));
	const renderIcons = () =>
		data.map((day) => (
			<div key={`Icons-${day.id}`} className={styles.WeatherTable_cell}>
				<img
					src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
					alt={day.weather.weatherCode}
					className={styles.WeatherTable_icon}
				/>
			</div>
		));
	const renderTemps = () =>
		data.map((day) => (
			<div key={`Temps-${day.id}`} className={styles.WeatherTable_cell}>
				{day.weather.temperature}&#8451;
			</div>
		));
	const renderWinds = () =>
		data.map((day) => (
			<div key={`Winds-${day.id}`} className={styles.WeatherTable_cell}>
				{day.weather.windSpeed} m/s
			</div>
		));

	const renderVerticalRow = (day: WeatherTableData) => (
		<div key={`vertical-row-${day.id}`} className={styles.WeatherTable_row}>
			<div className={styles.WeatherTable_cell}>{day.title}</div>
			<div className={styles.WeatherTable_cell}>
				<img
					src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
					alt={day.weather.weatherCode}
					className={styles.WeatherTable_icon}
				/>
			</div>
			<div className={styles.WeatherTable_cell}>
				{day.weather.temperature}&#8451;
			</div>
			<div className={styles.WeatherTable_cell}>
				{day.weather.windSpeed} m/s
			</div>
		</div>
	);

	const rows = [renderTitles, renderIcons, renderTemps, renderWinds];
	return (
		<div className={styles.WeatherTable_wrapper}>
			<div
				className={classNames(
					styles.WeatherTable,
					{
						[styles.WeatherTable___vertical]: vertical,
					},
					className
				)}
			>
				{vertical ? (
					<>
						<div className={styles.WeatherTable_row}>
							<div className={styles.WeatherTable_cell}>{titleText || ''}</div>
							<div className={styles.WeatherTable_cell}>Weather</div>
							<div className={styles.WeatherTable_cell}>Temperature</div>
							<div className={styles.WeatherTable_cell}>Wind speed</div>
						</div>
						{data.map(renderVerticalRow)}
					</>
				) : (
					rows.map((func, index) => (
						<div key={`table-row-${index}`} className={styles.WeatherTable_row}>
							{func()}
						</div>
					))
				)}
			</div>
		</div>
	);
};
