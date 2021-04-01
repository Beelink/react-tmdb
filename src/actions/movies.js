import api from '../services/api';
import types from './types';

export const LoadMovies = (pageNumber = 1, filter = 'popular') => {
	return (dispatch) => {
		dispatch(onLoadMovies.request());
		return onLoadMovies.fetch(pageNumber, filter)
			.then(({ data }) => {
				dispatch(onLoadMovies.success(data));
			})
			.catch((error) => {
				dispatch(onLoadMovies.error(error))
			});
	}
};

const onLoadMovies = {
	request: () => ({
		type: types.movies.loadMoviesRequest
	}),
	fetch: (pageNumber, filter) => {
		return api.request.get(`/movie/${filter}?page=${pageNumber}`);
	},
	success: (payload) => {
		return {
			type: types.movies.loadMoviesSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.movies.loadMoviesError,
		errors: payload
	})
};

export const LoadSearch = (query, page = 1) => {
	return (dispatch) => {
		dispatch(onLoadSearch.request(query));
		return onLoadSearch.fetch(query, page)
			.then(({ data }) => {
				dispatch(onLoadSearch.success(data));
			})
			.catch((error) => {
				dispatch(onLoadSearch.error(error))
			});
	}
};

const onLoadSearch = {
	request: (query) => ({
		type: types.search.loadSearchRequest,
		searchText: query
	}),
	fetch: (query, page) => {
		return api.request.get(`/search/movie?query=${query}&page=${page}`);
	},
	success: (payload) => {
		return {
			type: types.search.loadSearchSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.search.loadSearchError,
		errors: payload
	})
};

export const ClearSearch = () => {
	return (dispatch) => {
		dispatch(onClearSearch.request());
	}
};

const onClearSearch = {
	request: () => {
		return ({
			type: types.search.clearSearch
		})
	}
};