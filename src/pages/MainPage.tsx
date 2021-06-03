import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { CurrentCityWidget } from '../components/Widgets/CurrentCityWidget';
import { SavedCitiesList } from '../components/SavedCities/SavedCitiesList';
import { useSelector } from 'react-redux';
import { AuthForm } from '../components/AuthForm';
import { RootState } from '../redux/rootReducer';
import { signOut } from '../api/firebase.api';

export const MainPage: React.FC = () => {
	const user = useSelector(({ auth }: RootState) => auth.user);

	const isAuthorized = user !== null;

	const title = isAuthorized ? 'Saved cities' : 'Authorization';

	return (
		<>
			<CurrentCityWidget />
			<Divider />
			{isAuthorized && <Button onClick={signOut}>Sign out</Button>}
			<Typography.Title level={2}>{title}</Typography.Title>
			{isAuthorized && <SavedCitiesList />}
			{!isAuthorized && (
				<Row>
					<Col span={24} md={12}>
						<AuthForm />
					</Col>
				</Row>
			)}
		</>
	);
};
