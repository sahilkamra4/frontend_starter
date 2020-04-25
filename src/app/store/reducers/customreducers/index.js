import { combineReducers } from 'redux';
import upload from './upload.reducer'
import displayDate from './date.reducer'
import scheduledTweets from './allScheduledTweets.reducer'
const CustomReducers = combineReducers({
	upload,
	displayDate,
	scheduledTweets,
	
});

export default CustomReducers;