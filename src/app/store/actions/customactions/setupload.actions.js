import firebaseService from 'app/services/firebaseService';

export const SET_IMAGE = '[IMAGE] SET';
export const SET_STATUS = 'SET_STATUS';
export const ADD_SUBTWEET ='ADD_SUBTWEET';
export const SET_TWEET='SET_TWEET'
export const SET_DOWNLOAD_URL='SET_DOWNLOAD_URL'
export const SAVE_TWEET='SAVE_TWEET'
export const RESET_STATE='RESET_STATE'
export const HANDLE_DATE_CHANGE='HANDLE_DATE_CHANGE'



export function setUpload(image,index) {
	return {
		type: SET_IMAGE,
		payload:image,
		thread_index:index
	};
}

export function setStatus(status) {
	return {
		type: SET_STATUS,
		payload:status
	};

}

export function addSubtweet(tweet_index){
	return {
		type:"ADD_SUBTWEET",
		tweet_index:tweet_index
	}
}

export function setTweet(value,index){
	return {
		type:"SET_TWEET",
		value:value,
		thread_index:index
	}
}

export function setDownloadUrl(value,index){
	return {
		type:"SET_DOWNLOAD_URL",
		value:value,
		thread_index:index
	}
}
export function saveTweet(tweet_id,user_id){

	
	return {
		type:"SAVE_TWEET",
		tweet_id:tweet_id,
		user_id:user_id
	}
}

export function resetState(){
	return {
		type:"RESET_STATE"
	}
}

export function handleDateChange(event){
	return {
		type:"HANDLE_DATE_CHANGE",
		event:event
	}
}