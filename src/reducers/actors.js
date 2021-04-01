import types from '../actions/types';

const initialState = {
	all: [],
	isFetched: false
};

const actors = (state = initialState, action) => {
	switch (action.type) {
		case types.actors.loadActorsRequest:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case types.actors.loadActorsSuccess:
			return {
				...state,
				all: action.payload.cast,
				isFetched: true
			};
		default:
			return state;
	}
};

export default actors;