import types from '../actions/types';

const initialState = {
	movies: [],
	pageNumber: 1,
	total: 0,
	isFetched: false,
};

const starring = (state = initialState, action) => {
	switch (action.type) {
		case types.starring.loadStarringRequest:
			return {
				...state,
				movies: [],
				pageNumber: 1,
				total: 0,
				isFetched: false
			};
		case types.starring.loadStarringSuccess:
			let pageNumber = action.pageNumber;
			let allMovies = action.payload.cast

			let startPoint = (pageNumber - 1) * 20;
			let endPoint = allMovies.length >= startPoint + 20 ? startPoint + 20 : allMovies.length - 1;

			return {
				...state,
				movies: allMovies.slice(startPoint, endPoint),
				pageNumber: Number(pageNumber),
				total: allMovies.length,
				isFetched: true
			};
		default:
			return state;
	}
};

export default starring;