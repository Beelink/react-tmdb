import api from '../services/api';
import types from './types';

export const LoadGenres = () => {
	return (dispatch) => {
		dispatch(onLoadGenres.request());
		return onLoadGenres.fetch()
			.then(({ data }) => {
				dispatch(onLoadGenres.success(data));
			})
			.catch((error) => {
				dispatch(onLoadGenres.error(error))
			});
	}
};

const onLoadGenres = {
	request: () => ({
		type: types.genres.loadGenresRequest
	}),
	fetch: () => {
		return api.request.get('/genre/movie/list');
	},
	success: (payload) => {
		return {
			type: types.genres.loadGenresSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.genres.loadGenresError,
		errors: payload
	})
};