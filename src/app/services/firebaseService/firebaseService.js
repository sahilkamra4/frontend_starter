import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './firebaseServiceConfig';
var firebaseui = require('firebaseui')

// import Firebase from '.';


console.log("Reached firebase library")

class FirebaseService {

	// constructor(){
		
	// 	firebase.initializeApp(config);
	
	// 	// this.db = firebase.database();
	// 	this.auth = firebase.auth();
	// }


	init(success) {
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			success(false);
			return;
		}

		if (firebase.apps.length) {
			return;
		}

		firebase.initializeApp(config);
	
		this.db = firebase.database();
		this.auth = firebase.auth();
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		console.log(firebase.app().name)
		success(true);
	}
	getUserData = userId => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.db
				.ref(`users/${userId}`)
				.once('value')
				.then(snapshot => {
					const user = snapshot.val();
					resolve(user);
				});
		});
	};

	
	updateUserData = user => {
		if (!firebase.apps.length) {
			return false;
		}
		return this.db.ref(`users/${user.uid}`).set(user);
	};

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};

	getAuthFunction = ()=>{
		console.log("Auth executed")
		return this.auth
	}
	getAuthProp=()=>{
		
		return firebase.auth
	}

	signinRedirect=()=>{
		var provider = new firebase.auth.TwitterAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	getRedirectCode=()=>{
		firebase.auth().getRedirectResult().then(function(result) {
			if (result.credential) {
			  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			  // You can use these server side with your app's credentials to access the Twitter API.
			  var token = result.credential.accessToken;
			  var secret = result.credential.secret;
			  console.log(token)
			  console.log(secret)
			  // ...
			}
			// The signed-in user info.
			var user = result.user;
			console.log(user)
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			console.log(errorCode)
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		  });
	}
	getTwitterSignInUi=()=>{
		var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth', {
			signInOptions: [
			  firebase.auth.TwitterAuthProvider.PROVIDER_ID
			],
			// Other config options...
		  });
	}
}





const instance = new FirebaseService();
export default instance;
