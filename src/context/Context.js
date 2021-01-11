import React, { createContext, useReducer, useState, useEffect } from 'react';
import { rootReducer, states } from './RootReducer';
import firebase from '../config/firebase';
import { userGetData } from './actions/authActions';

const context = createContext();

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, states);
	const [currentUser, setcurrentUser] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(updateUser);
	}, []);

	const updateUser = (user) => {
		setcurrentUser(user);
		if (user) {
			userGetData(dispatch, user.uid);
		}
	};

	return (
		<context.Provider value={{ state, dispatch, currentUser }}>
			{children}
		</context.Provider>
	);
};

export { ContextProvider, context };
