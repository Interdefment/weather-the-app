import { getGeocode, getLatLng, GeocodeResult } from 'use-places-autocomplete';
import { Coords as GoogleCoords } from 'google-map-react';
import { DEFAULT_COORDS } from '../constants';
import { City } from '../types';

const getUserGeolocation = (): Promise<GoogleCoords> =>
	new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			const success: PositionCallback = (position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			};
			const error: PositionErrorCallback = (err) => {
				reject(err);
			};
			const options = { timeout: 1000 };
			navigator.geolocation.getCurrentPosition(success, error, options);
		} else {
			reject('Geolocation is not available');
		}
	});

const getCityData = async (
	result: GeocodeResult,
	coords?: GoogleCoords
): Promise<City> => {
	if (!coords) {
		coords = await getLatLng(result);
	}
	const cityName = result.address_components.find(
		(component) =>
			component.types.includes('locality') ||
			component.types.includes('postal_town')
	);
	const state = result.address_components.find((component) =>
		component.types.includes('administrative_area_level_1')
	);
	const country = result.address_components.find((component) =>
		component.types.includes('country')
	);
	if (!cityName || !country) {
		throw new Error('Incorrect city coordinates.');
	}
	const city: City = {
		coord: {
			lat: coords.lat,
			lon: coords.lng,
		},
		country: country.short_name,
		id: result.place_id,
		name: cityName.long_name,
	};
	if (state?.short_name) {
		city.state = state?.short_name;
	}
	return city;
};

const getCityByLocation = async (coords: GoogleCoords): Promise<City> => {
	const [result] = await getGeocode({
		location: coords,
	});
	const city = await getCityData(result, coords);
	return city;
};

export const getUserLocationCity = async (): Promise<City> => {
	try {
		const coords = await getUserGeolocation();
		return getCityByLocation(coords);
	} catch {
		return getCityByLocation(DEFAULT_COORDS);
	}
};

export const getCityById = async (placeId: string) => {
	const [result] = await getGeocode({ placeId });
	const city = await getCityData(result);
	return city;
};
