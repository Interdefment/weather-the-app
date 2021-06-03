import React from 'react';
import { Popover } from 'antd';
import { City, CurrentWeather } from '../../types';
import { FaMapMarker } from 'react-icons/fa';

import styles from './MapMarker.module.css';

type CityWidgetProps = {
	className?: string;
	weather: CurrentWeather;
	city: City;
	lat?: number;
	lng?: number;
	widgetVisible: boolean;
	onVisibleChange?: (value: boolean) => void;
};

export const MapMarker: React.FC<CityWidgetProps> = ({
	widgetVisible,
	onVisibleChange,
	weather,
	city,
}) => {
	return (
		<Popover
			content={
				<div>
					<p className={styles.MapMarker_popover_text}>{weather.temp}&#8451;</p>
					<p className={styles.MapMarker_popover_text}>
						{weather.weather[0].description}
					</p>
					<p className={styles.MapMarker_popover_text}>
						Wind - {weather.wind_speed} meter per second
					</p>
				</div>
			}
			title={`${city.name}, ${city.country}`}
			trigger="click"
			visible={widgetVisible}
			onVisibleChange={onVisibleChange}
		>
			<FaMapMarker
				size={32}
				style={{
					transform: 'translate(-50%, -50%)',
					cursor: 'pointer',
				}}
				color="tomato"
			/>
		</Popover>
	);
};
