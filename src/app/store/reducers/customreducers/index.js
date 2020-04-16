import { combineReducers } from 'redux';
import upload from './upload.reducer'
const fuseReducers = combineReducers({
	upload,
	
});

export default fuseReducers;