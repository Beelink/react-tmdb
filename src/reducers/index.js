import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import movies from './movies';
import genres from './genres';

export default combineReducers({
	routing: routerReducer,
	movies,
	genres,
});