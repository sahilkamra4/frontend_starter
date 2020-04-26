import firebaseService from 'app/services/firebaseService';

export const SET_IMAGE_EDIT = '[IMAGE] SET EDIT';
export const SET_STATUS_EDIT = 'SET_STATUS EDIT';
export const ADD_SUBTWEET_EDIT ='ADD_SUBTWEET';
export const SET_TWEET_EDIT='SET_TWEET_EDIT'
export const SET_DOWNLOAD_URL_EDIT='SET_DOWNLOAD_URL_EDIT'
export const SAVE_TWEET_EDIT='SAVE_TWEET_EDIT'
export const RESET_STATE_EDIT='RESET_STATE_EDIT'
export const HANDLE_DATE_CHANGE_EDIT='HANDLE_DATE_CHANGE_EDIT'
export const REMOVE_TEMP_IMAGE_EDIT='REMOVE_TEMP_IMAGE_EDIT'
export const REMOVE_SUBTWEET_EDIT='REMOVE_SUBTWEET_EDIT'
export const FETCH_GIVEN_TWEET='FETCH_GIVEN_TWEET'

export function setUploadEdit(image,index) {
	return {
		type: SET_IMAGE_EDIT,
		payload:image,
		thread_index:index
	};
}

export function setStatusEdit(status) {
	return {
		type: SET_STATUS_EDIT,
		payload:status
	};

}

export function addSubtweetEdit(tweet_index){
	return {
		type:"ADD_SUBTWEET_EDIT",
		tweet_index:tweet_index
	}
}

export function setTweetEdit(value,index){
	return {
		type:"SET_TWEET_EDIT",
		value:value,
		thread_index:index
	}
}

export function setDownloadUrlEdit(value,index){
	return {
		type:"SET_DOWNLOAD_URL_EDIT",
		value:value,
		thread_index:index
	}
}
export function saveTweetEdit(tweet_id,user_id){

	
	return {
		type:"SAVE_TWEET_EDIT",
		tweet_id:tweet_id,
		user_id:user_id
	}
}

export function resetStateEdit(){
	return {
		type:"RESET_STATE_EDIT"
	}
}

export function handleDateChangeEdit(event){
	return {
		type:"HANDLE_DATE_CHANGE_EDIT",
		event:event
	}
}

export function removeUploadImageEdit(index){
	return {
		type:"REMOVE_TEMP_IMAGE_EDIT",
		index:index
	}
}

export function removeSubTweetEdit(index){
	return {
		type:"REMOVE_SUBTWEET_EDIT",
		index:index
	}
}

export function fetchTweetEdit(data){
    return {
        type:"FETCH_GIVEN_TWEET",
        payload:data
    }
}