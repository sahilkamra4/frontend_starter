import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import customReducers from './customreducers'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		customReducers,
		...asyncReducers
	});

export default createReducer;
