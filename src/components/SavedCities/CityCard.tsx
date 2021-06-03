import React from 'react';
import { City } from '../../types';
import classNames from 'classnames';
import styles from './CityCard.module.css';
import { Typography } from 'antd';

type CityCardProps = {
	city: City;
	onClick?: () => void;
	className?: string;
};

export const CityCard: React.FC<CityCardProps> = ({
	city,
	onClick,
	className,
}) => {
	return (
		<div className={classNames(styles.CityCard, className)} onClick={onClick}>
			<Typography.Title level={5} className={styles.CityCard_title}>
				{city.name}, {city.country}
			</Typography.Title>
		</div>
	);
};
