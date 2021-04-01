import types from '../actions/types';

const initialState = {
	all: [],
	isFetched: false
};

const recommendations = (state = initialState, action) => {
	switch (action.type) {
		case types.recommendations.loadReccomendationsRequest:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case types.recommendations.loadReccomendationsSuccess:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};

export default recommendations;