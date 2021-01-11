const combineReducers = (slices) => (prevState, action) =>
	Object.keys(slices).reduce(
		(nextState, nextProp) => ({
			...nextState,
			[nextProp]: slices[nextProp](prevState[nextProp], action),
		}),
		prevState
	);

const rootReducer = combineReducers({});

const states = {};

export { rootReducer, states };
