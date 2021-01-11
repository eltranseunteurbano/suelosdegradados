import firebase from '../../config/firebase';
import moment from 'moment';

export const SET_ALL_VALUES = 'AUTH_SET_ALL_VALUES';
export const SET_AUTH_NAME = 'AUTH_SET_AUTH_NAME';
export const SET_AUTH_LAST_NAME = 'AUTH_SET_AUTH_LAST_NAME';
export const SET_AUTH_EMAIL = 'AUTH_SET_AUTH_EMAIL';
export const SET_AUTH_UID = 'AUTH_SET_AUTH_UID';
export const SET_DEFAULTS = 'AUTH_SET_DEFAULTS';
export const SET_AUTH_PASSWORD = 'AUTH_SET_AUTH_PASSWORD';
export const UPDATE_PROFILE = 'AUTH_UPDATE_PROFILE';

const auth = firebase.auth();
const userDB = firebase.firestore().collection('users');

export const userGetData = (dispatch, id) => {
	userDB.doc(id).onSnapshot((snapshot) => {
		dispatch({ type: SET_ALL_VALUES, value: snapshot.data() });
	});
};

export const handleAuthValues = (dispatch, id, value) => {
	switch (id) {
		case 'name':
			dispatch({ type: SET_AUTH_NAME, value: value });
			break;

		case 'last_name':
			dispatch({ type: SET_AUTH_LAST_NAME, value: value });
			break;

		case 'email':
			dispatch({ type: SET_AUTH_EMAIL, value: value });
			break;

		case 'password':
			dispatch({ type: SET_AUTH_PASSWORD, value: value });
			break;

		default:
			break;
	}
};

export const signInWithGoogle = async (dispatch, history, route) => {
	let provider = new firebase.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then(async (res) => {
			dispatch({ type: SET_AUTH_UID, value: res.user.uid });
			let now = moment();
			await userDB
				.doc(res.user.uid)
				.get()
				.then(async (doc) => {
					if (doc.exists) {
						userDB.doc(res.user.uid).set({ last_visit: now }, { merge: true });
					} else {
						userDB.doc(res.user.uid).set({
							created_date: now,
							email: res.user.email,
							last_visit: now,
							last_name: res.additionalUserInfo.profile.family_name,
							name: res.additionalUserInfo.profile.given_name,
							photo: res.user.photoURL,
							uid: res.user.uid,
							images: [],
						});
					}
					history.push(route);
				});
		})
		.catch();
};

export const signInWithEmailAndPassword = async (dispatch, email, password) => {
	let now = moment();

	await auth
		.signInWithEmailAndPassword(email, password)
		.then(async (doc) => {
			userDB.doc(doc.user.uid).set({ last_visit: now }, { merge: true });
			dispatch({ type: SET_AUTH_UID, value: doc.user.uid });
		})
		.catch((err) => {
			console.error(err.message);
		});
};

export const passwordReset = async (dispatch, email) => {
	auth.sendPasswordResetEmail(email).catch((err) => {
		console.error(err.message);
	});
};

export const createUserWithEmailAndPassword = async (
	dispatch,
	email,
	password,
	name,
	last_name
) => {
	let now = moment();

	await auth
		.createUserWithEmailAndPassword(email, password)
		.then(async (res) => {
			dispatch({ type: SET_AUTH_UID, value: res.user.uid });
			userDB.doc(res.user.uid).set({
				uID: res.user.uid,
				name: name,
				last_name: last_name,
				email: email,
				created_date: now,
				last_visit: now,
				images: [],
			});
			userGetData(res.user.uid);
		})
		.catch((err) => {
			console.error(err.message);
		});
};

export const signOut = async (dispatch) => {
	auth
		.signOut()
		.then(() => {
			dispatch({ type: SET_DEFAULTS });
		})
		.catch((err) => {
			console.error(err.message);
		});
};

export const updateProfile = async (dispatch, id, name, last_name) => {
	userDB
		.doc(id)
		.set(
			{
				name: name,
				last_name: last_name,
			},
			{ merge: true }
		)
		.catch((err) => console.error(err.message));
};
