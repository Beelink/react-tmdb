import api from '../services/api';
import types from './types';

export const LoadMovie = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadMovie.request());
		return onLoadMovie.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadMovie.success(data));
			})
			.catch((error) => {
				dispatch(onLoadMovie.error(error))
			});
	}
};

const onLoadMovie = {
	request: () => ({
		type: types.movie.loadMovieRequest
	}),
	fetch: (movie_id) => {
		return api.request.get(`/movie/${movie_id}`);
	},
	success: (payload) => {
		return {
			type: types.movie.loadMovieSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.movie.loadMovieError,
		errors: payload
	})
};