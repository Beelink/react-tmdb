import api from '../services/api';
import types from './types';

export const LoadActors = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadActors.request());
		return onLoadActors.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadActors.success(data));
			})
			.catch((error) => {
				dispatch(onLoadActors.error(error))
			});
	}
};

const onLoadActors = {
	request: () => ({
		type: types.actors.loadActorsRequest
	}),
	fetch: (movie_id) => {
		return api.request.get(`/movie/${movie_id}/credits`);
	},
	success: (payload) => {
		return {
			type: types.actors.loadActorsSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.actors.loadActorsError,
		errors: payload
	})
};