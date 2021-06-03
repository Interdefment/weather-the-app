import React, { useState } from 'react';
import { Typography } from 'antd';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { getCityById } from '../../api/geo.api';
import { City } from '../../types';
import { PlacesAutocomplete } from './PlacesAutocomplete';

import styles from './CityStatus.module.css';
import classNames from 'classnames';

type CityStatusProps = {
	city?: City;
	onSelect: (city: City) => void;
	className?: string;
};

export const CityStatus: React.FC<CityStatusProps> = ({
	city,
	onSelect,
	className,
}) => {
	const [inputMode, setInputMode] = useState(!city);

	const handleSelect = async (value: string) => {
		const city = await getCityById(value);
		onSelect(city);
		setInputMode(false);
	};

	const cityName = city ? `${city.name}, ${city.country}` : '';

	return (
		<div className={classNames(styles.CityStatus, className)}>
			{inputMode ? (
				<>
					<PlacesAutocomplete
						onSelect={handleSelect}
						className={styles.CityStatus_autocomplete}
					/>
					<FaTimes
						size={32}
						className={classNames(
							styles.CityStatus_icon,
							styles.CityStatus_icon___lg
						)}
						onClick={() => setInputMode(false)}
					/>
				</>
			) : (
				<>
					<Typography.Text className={styles.CityStatus_text}>
						{cityName}
					</Typography.Text>
					<FaPencilAlt
						size={32}
						className={styles.CityStatus_icon}
						onClick={() => setInputMode(true)}
					/>
				</>
			)}
		</div>
	);
};
