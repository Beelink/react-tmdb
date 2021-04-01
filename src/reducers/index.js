import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import movies from './movies';
import genres from './genres';
import movie from './movie';
import actors from './actors';

export default combineReducers({
	routing: routerReducer,
	movies,
	genres,
	movie,
	actors,
});