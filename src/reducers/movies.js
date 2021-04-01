import types from '../actions/types';

const initialState = {
	all: [],
	filter: 'popular',
	isFetched: false,
	searchText: ''
};

const movies = (state = initialState, action) => {
	switch (action.type) {
		case types.movies.loadMoviesRequest:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case types.movies.loadMoviesSuccess:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		case types.search.loadSearchRequest:
			return {
				...state,
				all: [],
				searchText: action.searchText,
				isFetched: false
			};
		case types.search.loadSearchSuccess:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		case types.search.clearSearch:
			return {
				...state,
				searchText: ''
			};
		default:
			return state;
	}
};

export default movies;