import React, { useState } from 'react';
import { Col, Drawer, Row, Layout } from 'antd';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { loadWeatherData } from '../../redux/weatherReducer';
import { CityStatus } from '../CityStatus/CityStatus';
import { NavMenu } from './NavMenu';
import { useWindowDimensions } from '../../hooks/window';
import { City } from '../../types';

import styles from './Header.module.css';

export const Header = () => {
	const { city } = useSelector((state: RootState) => ({
		city: state.weather.city,
	}));

	const path = useLocation().pathname.split('/')[1];
	const history = useHistory();
	const dispatch = useDispatch();
	const handleSelect = async (city: City) => {
		if (path === 'city') {
			history.push('/today');
		}
		await dispatch(loadWeatherData(city));
	};

	const { width } = useWindowDimensions();
	const isMobile = width < 768;

	const [opened, setOpened] = useState(false);
	const onLinkClick = () => setOpened(false);

	return (
		<>
			<Drawer
				visible={opened}
				placement="right"
				onClose={() => setOpened(!opened)}
				closable={false}
			>
				<NavMenu mode="vertical" onLinkClick={onLinkClick} />
				<CityStatus
					city={city}
					onSelect={handleSelect}
					className={styles.Header_cityStatus}
				/>
			</Drawer>
			<Layout.Header>
				<Row align="middle" justify="space-between">
					<Col>
						<NavLink to="/" exact className={styles.Header_title}>
							Weather app
						</NavLink>
					</Col>
					{!isMobile && (
						<Col className={styles.Header_menuColumn}>
							<NavMenu mode="horizontal" onLinkClick={onLinkClick} />
						</Col>
					)}
					<Col>
						{isMobile ? (
							<FaBars
								size={24}
								className={styles.Header_icon}
								onClick={() => setOpened(!opened)}
							/>
						) : (
							<CityStatus city={city} onSelect={handleSelect} />
						)}
					</Col>
				</Row>
			</Layout.Header>
		</>
	);
};
