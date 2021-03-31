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

export const LoadSearchMovies = (query, page = 1) => {
	return (dispatch) => {
		dispatch(onLoadSearchMovies.request(query));
		return onLoadSearchMovies.fetch(query, page)
			.then(({ data }) => {
				dispatch(onLoadSearchMovies.success(data));
			})
			.catch((error) => {
				dispatch(onLoadSearchMovies.error(error))
			});
	}
};

const onLoadSearchMovies = {
	request: (query) => ({
		type: types.movies.loadSearchMoviesRequest,
		searchText: query
	}),
	fetch: (query, page) => {
		return api.request.get(`/search/movie?query=${query}&page=${page}`);
	},
	success: (payload) => {
		return {
			type: types.movies.loadSearchMoviesSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.movies.loadSearchMoviesError,
		errors: payload
	})
};

export const ClearSearchText = () => {
	return (dispatch) => {
		dispatch(onClearSearchText.request());
	}
};

const onClearSearchText = {
	request: () => {
		return ({
			type: types.movies.clearSearchText
		})
	}
};