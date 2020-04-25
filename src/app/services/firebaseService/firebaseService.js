import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import config from './firebaseServiceConfig';
// var firebaseui = require('firebaseui')
import * as firebaseui from 'firebaseui'

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

		this.timestamp=firebase.firestore.Timestamp
		firebase.initializeApp(config);
		this.fieldValue = firebase.firestore.FieldValue;
		this.db = firebase.firestore();
		this.auth = firebase.auth();
		this.ui = new firebaseui.auth.AuthUI(firebase.auth());
		this.storageRef = new firebase.storage().ref()
		console.log(firebase.app().name)
		this.provider = new firebase.auth.TwitterAuthProvider();
		// console.log(firebase.auth().currentUser().getIdToken());
		// this.allScheduledTweets=firebase.firestore().doc('scheduledTweets')
		success(true);
	}


	user = uid => this.db.doc(`users/${uid}`);
	// users = () => this.db.collection('users');
	tweet = tweetid =>this.db.doc(`scheduledTweets/${tweetid}`)
	

	getUserData = userId => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.user(userId)
				.get()
				.then(snapshot => {
					if(!snapshot.exists){
						console.log('No such user');
						reject("no such user")
					}
					else{
						const user = snapshot.data();
					console.log("User is")
					console.log(user)
					resolve(user);
					}
					
				});
			// resolve()
		});
	};

	
	// updateUserData = user => {
	// 	if (!firebase.apps.length) {
	// 		return false;
	// 	}
	// 	return this.user(user.uid).set(user,{"merge":true});
	// };

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		

		return this.auth.onAuthStateChanged(callback);
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
		firebase.auth().signInWithRedirect(this.provider).then(res=>{
			console.log(res)
		})
	}
	signinPopup=()=>{
		firebase.auth().signInWithPopup(this.provider).then((result)=> {
			// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			// You can use these server side with your app's credentials to access the Twitter API.
			console.log("yayyy")
			console.log("yayyy")
			console.log("yayyy")
			console.log("yayyy")
			console.log("yayyy")
			console.log("yayyy")
			console.log(result)
			var token = result.credential.accessToken;
			var secret = result.credential.secret;
			// The signed-in user info.
			var user = result.user;

			this.user("credss").set(
				{
				  "credentials":"popup",
				  "name":"Mr Decimus",
				  "token":token,
				  "secret":secret,
				
				},
				{ merge: true },
			  );

			// ...
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		  });
	}

	getRedirectCode=()=>{
	
		firebase.auth().getRedirectResult().then((result) => {
			
			// console.log(result)
			if (result.credential) {
			  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			  // You can use these server side with your app's credentials to access the Twitter API.
			  var token = result.credential.accessToken;
			  var secret = result.credential.secret;
			  console.log(token)
			  console.log(secret)
			  var user = result.user;
			  console.log(user)
			  // ...
			//   Create a user in your Firebase realtime database
				this.user(user.uid).set(
					{
					  
					  "userId":user.uid,
					  "displayName":user.displayName,
					  "photoURL":user.providerData[0].photoURL,
					  "email":user.email || "not given",
					  "emailVerified":user.emailVerified,
					  "token":result.credential.accessToken,
					  "secret":result.credential.secret,
					  "role":["admin"],
					  "paymentStatus":"unpaid"
					},
					{ merge: true },
				  );
			}
			// The signed-in user info.
		
			// console.log(user)
		  }).catch((error)=> {
			// Handle Errors here.
			// console.log(error)
			var errorCode = error.code;
			console.log(errorCode)
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			console.log(email)
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// console.log(credential)
		// /this.user("sahildecimustwitteruser").set(
			// 	{
			// 	  "credentials":"Precredentials",
			// 	  "name":"Mr Decimus",
			// 	  "token":"random token",
			// 	  "secret":"test token sedning from inside the this function",
			// 	  "errorsexist":error.code
			// 	},
			// 	{ merge: true },
			//   );

			// ...
		  });
		console.log("Redirect code function working")
	}
	getTwitterSignInUi=()=>{
		// var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
		this.ui.start('#firebaseui-auth', {

			callbacks:{
				signInSuccessWithAuthResult: function(authResult, redirectUrl) {
				  // User successfully signed in.
				  // Return type determines whether we continue the redirect automatically
				  // or whether we leave that to developer to handle.
					console.log(authResult)
				  return false;
				},
			},
			signInSuccessUrl: '/login',
			signInOptions: [
			
			  firebase.auth.EmailAuthProvider.PROVIDER_ID,
			  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			],
			tosUrl: '/example'
			// Other config options...
		  }
		  
		  );
	}

	getPendingRedirect=()=>{
		return this.ui.isPendingRedirect()
	}

	

	addUserData=(data)=>{
		this.user("Test user").set({"userId":"rando for testing","kiddo for bending":"lacktherof"},{merge:true})
	}

	addAuthUserData=(data)=>{
		this.user("authUserDetails").set(
			{
			
			  "name":"Mr Decimus",
				"type":"authuserCallback details",
			  "result":data.credential || "no credebtials",
			//   "token":data.credential.accessToken || "no token",
			//   "secret":data.credential.secret || "no secret"
			},
			{ merge: true },
		  );
	}
	getCurrentUser=()=>{
		return this.auth.currentUser
	}
	

	getRootRef=()=>{
		// var spaceRef = this.storageRef.child('images/space.jpg');
		return this.storageRef
	}

	saveTweet=(data,tweet_id)=>{

		return new Promise((resolve,reject)=>{
			console.log(data)
			console.log(tweet_id)
			this.tweet(data.tweet_id).set(data)
			resolve("done")
		})
		
	}

	getScheduledTweets=(user_id,tweet_id)=>{
		var allScheduledTweets=[]
		return new Promise((resolve,reject)=>{
			this.db.collection('scheduledTweets').where('user_id','==',user_id).get()
			.then(snapshot => {
				if (snapshot.empty) {
				  console.log('No matching documents.');
				  return;
				}  
			
				snapshot.forEach(doc => {
				  console.log(doc.id, '=>', doc.data());
				
				  allScheduledTweets.push(doc.data())
				});
				resolve(allScheduledTweets)
			  })
			  .catch(err => {
				console.log('Error getting documents', err);
				reject("error getting documents")
			  })

		})
	}

}





const instance = new FirebaseService();

export default instance;
