import api from '../services/api';
import types from './types';

export const LoadStarring = (pageNumber = 1, actor_id) => {
	return (dispatch) => {
		dispatch(onLoadStarring.request());
		return onLoadStarring.fetch(actor_id)
			.then(({ data }) => {
				dispatch(onLoadStarring.success(pageNumber, data));
			})
			.catch((error) => {
				dispatch(onLoadStarring.error(error))
			});
	}
};

const onLoadStarring = {
	request: () => ({
		type: types.starring.loadStarringRequest
	}),
	fetch: (actor_id) => {
		return api.request.get(`/person/${actor_id}/movie_credits`);
	},
	success: (pageNumber, payload) => {
		return {
			type: types.starring.loadStarringSuccess,
			pageNumber,
			payload
		}
	},
	error: (payload) => ({
		type: types.starring.loadStarringError,
		errors: payload
	})
};