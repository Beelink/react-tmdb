import api from '../services/api';
import types from './types';

export const LoadActor = (actor_id) => {
	return (dispatch) => {
		dispatch(onLoadActor.request());
		return onLoadActor.fetch(actor_id)
			.then(({ data }) => {
				dispatch(onLoadActor.success(data));
			})
			.catch((error) => {
				dispatch(onLoadActor.error(error))
			});
	}
};

const onLoadActor = {
	request: () => ({
		type: types.actor.loadActorRequest
	}),
	fetch: (movie_id) => {
		return api.request.get(`/person/${movie_id}`);
	},
	success: (payload) => {
		return {
			type: types.actor.loadActorSuccess,
			payload
		}
	},
	error: (payload) => ({
		type: types.actor.loadActorError,
		errors: payload
	})
};