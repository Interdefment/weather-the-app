import { initializeApp } from 'firebase/app';
import { EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseui from 'firebaseui';

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'weather-the-app.firebaseapp.com',
	databaseURL:
		'https://weather-the-app-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'weather-the-app',
	storageBucket: 'weather-the-app.appspot.com',
	messagingSenderId: '501489274060',
	appId: '1:501489274060:web:4e6bce77734850a6bac669',
	signInOptions: [
		{
			provider: EmailAuthProvider.PROVIDER_ID,
			signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
		},
	],
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
