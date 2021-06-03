import React from 'react';
import { Spin, Typography } from 'antd';
import styles from './LoadingScreen.module.css';
import { Layout } from 'antd';

type LoadingScreenProps = {
	errorMessage?: string;
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
	errorMessage,
}) => {
	return (
		<Layout className={styles.fullscreen}>
			{errorMessage ? (
				<Typography.Title level={2}>{errorMessage}</Typography.Title>
			) : (
				<Spin size="large" />
			)}
		</Layout>
	);
};
