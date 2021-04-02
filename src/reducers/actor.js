import types from '../actions/types';

const initialState = {
	data: {},
	isFetched: false,
};

const actor = (state = initialState, action) => {
	switch (action.type) {
		case types.actor.loadActorRequest:
			return {
				...state,
				data: {},
				isFetched: false
			};
		case types.actor.loadActorSuccess:
			return {
				...state,
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};

export default actor;