import { combineReducers } from 'redux';
import upload from './upload.reducer'
import displayDate from './date.reducer'
import scheduledTweets from './allScheduledTweets.reducer'
import editTweet from './editTweet.reducer'

const CustomReducers = combineReducers({
	upload,
	displayDate,
	scheduledTweets,
	editTweet
	
});

export default CustomReducers;