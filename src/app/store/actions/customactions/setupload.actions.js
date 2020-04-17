export const SET_IMAGE = '[IMAGE] SET';
export const SET_STATUS = 'SET_STATUS';
export const ADD_SUBTWEET ='ADD_SUBTWEET';
export const SET_TWEET='SET_TWEET'

export function setUpload(image) {
	return {
		type: SET_IMAGE,
		payload:image
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