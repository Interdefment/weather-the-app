import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadWeatherData } from './redux/weatherReducer';
import store from './redux/store';

import { TodayPage } from './pages/TodayPage';
import { WeekPage } from './pages/WeekPage';
import { MainPage } from './pages/MainPage';
import { CityPage } from './pages/CityPage';

import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { Header } from './components/Header/Header';

import { getUserLocationCity } from './api/geo.api';
import { loadFromStorage, setSavedCities } from './redux/citiesReducer';
import { collection, query, where } from '@firebase/firestore';
import { db } from './config.firebase';
import { City, Entity } from './types';
import { useCollection } from './hooks/firebase';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { setUser } from './redux/authReducer';
import { RootState } from './redux/rootReducer';

const AppLayout: React.FC = () => {
	const dispatch = useDispatch();
	const userId = useSelector((state: RootState) => state.auth.user?.uid);
	const [initializing, setInitializing] = useState(true);
	const [error, setError] = useState('');

	const citiesQuery = userId
		? () => query(collection(db, 'cities'), where('userId', '==', userId))
		: () => collection(db, 'cities');
	const setCities = (cities: Entity<City>[]) => {
		dispatch(
			setSavedCities(
				cities.map(({ id, data }) => ({
					...data,
					cityid: id,
				}))
			)
		);
	};
	useCollection<City>(citiesQuery, { data: setCities }, [userId]);

	useEffect(() => {
		const fetchCity = async () => {
			try {
				const city = await getUserLocationCity();
				await dispatch(loadWeatherData(city));
				setInitializing(false);
			} catch (error) {
				setError('Something went wrong... Try to reload the page.');
			}
		};
		dispatch(loadFromStorage());
		fetchCity();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		dispatch(setUser(user?.providerData[0] ?? null));
		if (!user) {
			dispatch(setSavedCities([]));
		}
	});

	if (initializing) {
		return <LoadingScreen errorMessage={error} />;
	}

	return (
		<Layout>
			<Header />
			<Layout.Content>
				<Switch>
					<Route path="/" exact>
						<MainPage />
					</Route>
					<Route path="/week">
						<WeekPage />
					</Route>
					<Route path="/tomorrow">
						<TodayPage />
					</Route>
					<Route path="/today">
						<TodayPage />
					</Route>
					<Route path="/city/:cityid">
						<CityPage />
					</Route>
				</Switch>
			</Layout.Content>
		</Layout>
	);
};

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppLayout />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
