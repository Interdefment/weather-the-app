import { Col, Row, Typography } from 'antd';
import React from 'react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks/window';
import { RootState } from '../../redux/rootReducer';
import { CityCard } from './CityCard';

import styles from './SavedCitiesList.module.css';

export const SavedCitiesList: React.FC = () => {
	const { width } = useWindowDimensions();
	const { savedCities } = useSelector((state: RootState) => ({
		savedCities: state.cities.saved,
	}));

	const cityColSpan = width < 480 ? 22 : width < 768 ? 12 : 6;
	return (
		<Row gutter={[30, 15]} justify={width < 480 ? 'space-around' : 'start'}>
			{savedCities.map((city) => (
				<Col
					span={cityColSpan}
					key={`saved-city-${city.id}`}
					className={styles.SavedCitiesList_column}
				>
					<NavLink
						to={`/city/${city.cityid}`}
						className={styles.SavedCitiesList_link}
					>
						<CityCard
							city={city}
							className="BlueGradientBox BlueGradientBox___hoverable"
						/>
					</NavLink>
				</Col>
			))}
			{savedCities.length === 0 && (
				<Typography.Paragraph>There is no cities yet.</Typography.Paragraph>
			)}
		</Row>
	);
};
