import * as Actions from '../actions';

const initialState = {
	role: [], // guest
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		// email: 'johndoe@withinpixels.com',
		// shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			console.log(action.payload)
			console.log("Set data added to global state")
			return {
				...initialState,
				...action.payload
			};
		}
		case Actions.REMOVE_USER_DATA: {
			return {
				...initialState
			};
		}
		case Actions.USER_LOGGED_OUT: {
			return initialState;
		}
		case Actions.GET_FIREBASE_AUTH_FUNCTION:{
			return {
				...initialState,
				...action.payload
			}
		}
		case Actions.GET_FIREBASE_AUTH_PROP:{
			return {
				...initialState,
				...action.payload
			}
		}
		default: {
			return state;
		}
	}
};

export default user;
