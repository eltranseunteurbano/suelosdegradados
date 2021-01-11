import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDx6vC-Z4_FqwqtRD7zRvLvVwAJx4XogsY',
	authDomain: 'suelos-degradados.firebaseapp.com',
	projectId: 'suelos-degradados',
	storageBucket: 'suelos-degradados.appspot.com',
	messagingSenderId: '1019847485229',
	appId: '1:1019847485229:web:eb6e06ff491360c7d655a4',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
