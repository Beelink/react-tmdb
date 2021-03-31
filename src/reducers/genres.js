import types from '../actions/types';

const initialState = {
	all: [],
	isFetched: false
};

const genres = (state = initialState, action) => {
	switch (action.type) {
		case types.genres.loadGenresRequest:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case types.genres.loadGenresSuccess:
			return {
				...state,
				all: action.payload.genres,
				isFetched: true
			};
		default:
			return state;
	}
}

export default genres;