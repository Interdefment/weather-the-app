import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapMarker } from './MapMarker';
import { MAPS_API_KEY } from '../../constants';
import { City, CurrentWeather } from '../../types';

import classNames from 'classnames';
import styles from './GoogleMap.module.css';

type MapWidgetProps = {
	city?: City;
	defaultZoom?: number;
	cityWeather?: CurrentWeather;
	absolute?: boolean;
	className?: string;
};

export const MapWidget: React.FC<MapWidgetProps> = ({
	city,
	cityWeather,
	defaultZoom,
	absolute,
	className,
}) => {
	const [markerExpanded, setMarkerExpanded] = useState(false);
	if (!city) {
		return null;
	}
	return (
		<div
			className={classNames(
				styles.GoogleMap,
				{ [styles.GoogleMap___absolute]: absolute },
				className
			)}
		>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: MAPS_API_KEY,
					language: 'en-US',
					libraries: ['places'],
				}}
				center={{
					lng: city.coord.lon,
					lat: city.coord.lat,
				}}
				defaultZoom={defaultZoom}
				onZoomAnimationStart={() => setMarkerExpanded(false)}
			>
				{cityWeather && (
					<MapMarker
						lat={city.coord.lat}
						lng={city.coord.lon}
						city={city}
						widgetVisible={markerExpanded}
						onVisibleChange={setMarkerExpanded}
						weather={cityWeather}
					/>
				)}
			</GoogleMapReact>
		</div>
	);
};

// Необходимо для корректного отображения маркера
MapWidget.defaultProps = {
	city: {
		coord: {
			lat: 0,
			lon: 0,
		},
		country: '',
		id: '',
		name: '',
	},
	defaultZoom: 11,
};
