import api from '../services/api';
import types from './types';

export const LoadRecommendations = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadRecommendations.request());
		return onLoadRecommendations.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadRecommendations.success(data));
			})
			.catch((error) => {
				dispatch(onLoadRecommendations.error(error))
			});
	}
};

const onLoadRecommendations = {
	request: () => ({
		type: types.recommendations.loadReccomendationsRequest
	}),
	fetch: (movie_id) => {
		return api.request.get(`/movie/${movie_id}/recommendations`);
	},
	success: (payload) => {
		return {
			type: types.recommendations.loadReccomendationsSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.recommendations.loadReccomendationsError,
		errors: payload
	})
};