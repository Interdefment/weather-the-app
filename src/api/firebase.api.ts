import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	updateProfile
} from '@firebase/auth';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from '@firebase/firestore';
import { db } from '../config.firebase';
import { City } from '../types';

export const addCity = async (city: City) => {
	const docRef = await addDoc(collection(db, 'cities'), city);

	return {
		...city,
		cityid: docRef.id,
	};
};

export const deleteCity = async (cityid: string) => {
	await deleteDoc(doc(db, 'cities', cityid));

	return cityid;
};

export const registerUser = async (email: string, password: string, username: string) => {
	const auth = getAuth();
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	await updateProfile(userCredential.user, {
		displayName: username
	})


	return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
	const auth = getAuth();
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);

	return userCredential.user;
};

export const signOut = async () => {
	const auth = getAuth();
	await firebaseSignOut(auth);
};

export const updateCityComment = async (cityId: string, comment: string) => {
	await updateDoc(doc(db, 'cities', cityId), {
		comment,
	});
};
