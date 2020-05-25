import history from '@history';
import _ from '@lodash';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import * as FuseActions from 'app/store/actions/fuse';
import firebase from 'firebase/app';
import FirebaseService from 'app/services/firebaseService';
export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';
export const GET_FIREBASE_AUTH_FUNCTION = 'AUTH FUNCTION';
export const GET_FIREBASE_AUTH_PROP = 'AUTH PROP';
export const UPDATE_ROLE = 'UPDATE_ROLE';

/**
 * Set user data from Auth0 token data
 */
export function setUserDataAuth0(tokenData) {
	const user = {
		role: ['admin'],
		from: 'auth0',
		data: {
			displayName: tokenData.username,
			photoURL: tokenData.picture,
			email: tokenData.email,
			settings:
				tokenData.user_metadata && tokenData.user_metadata.settings ? tokenData.user_metadata.settings : {},
			shortcuts:
				tokenData.user_metadata && tokenData.user_metadata.shortcuts ? tokenData.user_metadata.shortcuts : []
		}
	};

	return setUserData(user);
}

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser) {
	// if (
	// 	// user &&
	// 	// user.data &&
	// 	// user.data.settings &&
	// 	// user.data.settings.theme &&
	// 	// user.data.settings.layout &&
	// 	// user.data.settings.layout.style
	// 	user.role
	// ) {
	// 	// Set user data but do not update
	// 	return setUserData(user);
	// }
	console.log('Set data started');
	user.uid = user.userId;
	// Create missing user settings
	// return createUserSettingsFirebase(authUser);
	return createUserSettingsFirebase(user);
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser) {
	return (dispatch, getState) => {
		const guestUser = getState().auth.user;
		const fuseDefaultSettings = getState().fuse.settings.defaults;
		const { currentUser } = firebase.auth();

		/**
		 * Merge with current Settings
		 */
		// console.log(guestUser)
		// var set_role=authUser.isNewUser ? ['admin_new']:['admin']

		const user = _.merge(
			{},
			{
				uid: authUser.uid,
				from: 'firebase',
				role: authUser.role,
				data: {
					displayName: authUser.displayName,
					photoURL: authUser.photoURL,
					isNewUser: authUser.isNewUser,
					followers_count: authUser.followers_count,
					friends_count: authUser.friends_count
					// photoURL:"https://pbs.twimg.com/profile_images/1245958090249261056/XKnM5zuj.jpg"
				}

				// data: {
				// 	displayName: authUser.displayName,
				// 	email: authUser.email,
				// 	settings: { ...fuseDefaultSettings }
				// }
			}
		);
		// currentUser.updateProfile(user.data);

		// updateUserData(user, dispatch);
		return dispatch(setUserData(user));
	};
}

/**
 * Set User Data
 */
export function setUserData(user) {
	console.log('reached set user data');
	console.log(history);
	return dispatch => {
		/*
        You can redirect the logged-in user to a specific route depending on his role
         */

		//  history.push('/example')

		//the below is used when logged in but page is roll access protected, send to correct url
		// history.location.state = {
		//     redirectUrl: '/example' // for example 'apps/academy'
		// }
		console.log(user.role);
		console.log('location state set here');
		console.log(user.role == ['admin_new']);
		user.role = ['admin_new'];
		if (user.role[0] == 'admin_new') {
			history.location.state = {
				redirectUrl: '/setup/stripe' // for example 'apps/academy'
			};
		} else if (user.role[0] == 'admin') {
			history.location.state = {
				redirectUrl: '/dashboard' // for example 'apps/academy'
			};
		}
		console.log(history);
		console.log(history.location.state);

		console.log('Set data finished');
		/*
        Set User Settings
         */
		// dispatch(FuseActions.setDefaultSettings(user.data.settings));

		/*
        Set User Data
         */
		dispatch({
			type: SET_USER_DATA,
			payload: user
		});
	};
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user, dispatch);

		return dispatch(setUserData(user));
	};
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
	return (dispatch, getState) => {
		const { user } = getState().auth;
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		updateUserData(newUser, dispatch);

		return dispatch(setUserData(newUser));
	};
}

/**
 * Remove User Data
 */
export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

/**
 * Logout
 */
export function logoutUser() {
	return (dispatch, getState) => {
		const { user } = getState().auth;

		if (!user.role || user.role.length === 0) {
			// is guest
			return null;
		}

		history.push({
			pathname: '/'
		});

		switch (user.from) {
			case 'firebase': {
				firebaseService.signOut();
				break;
			}
			case 'auth0': {
				auth0Service.logout();
				break;
			}
			default: {
				jwtService.logout();
			}
		}

		dispatch(FuseActions.setInitialSettings());

		return dispatch({
			type: USER_LOGGED_OUT
		});
	};
}

/**
 * Update User Data
 */
function updateUserData(user, dispatch) {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	switch (user.from) {
		case 'firebase': {
			// firebaseService
			// .updateUserData(user)
			// .then(() => {
			// 	dispatch(MessageActions.showMessage({ message: 'User data saved to firebase' }));
			// })
			// .catch(error => {
			// 	dispatch(MessageActions.showMessage({ message: error.message }));
			// });
			break;
		}
		case 'auth0': {
			auth0Service
				.updateUserData({
					settings: user.data.settings,
					shortcuts: user.data.shortcuts
				})
				.then(() => {
					dispatch(MessageActions.showMessage({ message: 'User data saved to auth0' }));
				})
				.catch(error => {
					dispatch(MessageActions.showMessage({ message: error.message }));
				});
			break;
		}
		default: {
			jwtService
				.updateUserData(user)
				.then(() => {
					dispatch(MessageActions.showMessage({ message: 'User data saved with api' }));
				})
				.catch(error => {
					dispatch(MessageActions.showMessage({ message: error.message }));
				});
			break;
		}
	}
}

export function getAuthFunction() {
	return dispatch => {
		dispatch({
			type: GET_FIREBASE_AUTH_FUNCTION,
			payload: FirebaseService.getAuthFunction()
		});
	};
}
export function getAuthProp() {
	return dispatch => {
		dispatch({
			type: GET_FIREBASE_AUTH_PROP,
			payload: FirebaseService.getAuthProp()
		});
	};
}

export function updateRole(data) {
	return dispatch => {
		dispatch({
			type: UPDATE_ROLE,
			value: data
		});
	};
}
