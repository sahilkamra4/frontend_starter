export const SET_IMAGE = '[IMAGE] SET';
export const SET_STATUS = '[STATUS] SET';
export const ADD_SUBTWEET ='[SUBTWEET] ADD'
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

export function addSubtweet(tweet_num){
	return {
		type:"ADD_SUBTWEET",
		tweet_num:tweet_num
	}
}