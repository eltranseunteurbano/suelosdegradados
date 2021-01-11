import { useContext, useState, useEffect } from 'react';
import { context } from '../Context';
import * as authActions from './context/actions/authActions';

const useAuth = () => {
	const { state, dispatch } = useContext(context);

	const onChangeValues = (id, value) => {
		authActions.handleAuthValues(dispatch, id, value);
	};

	const handleLoginWithGoogle = () => {};

	return {
		handleLoginWithGoogle,
	};
};

export default useAuth;
