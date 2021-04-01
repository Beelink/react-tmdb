import types from '../actions/types';

const initialState = {
	data: {},
	isFetched: false,
};

const movie = (state = initialState, action) => {
	switch (action.type) {
		case types.movie.loadMovieRequest:
			return {
				...state,
				data: {},
				isFetched: false
			};
		case types.movie.loadMovieSuccess:
			return {
				...state,
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};

export default movie;