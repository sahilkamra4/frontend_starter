import { combineReducers } from 'redux';
import upload from './upload.reducer'
import displayDate from './date.reducer'

const CustomReducers = combineReducers({
	upload,
	displayDate
	
});

export default CustomReducers;