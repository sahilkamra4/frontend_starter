import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import user from './store/reducers/user.reducer';

class Auth extends Component {
	state = {
		waitAuthCheck: true,
		isNewUser:false,
		friends_count:0,
		followers_count:0
	};
	

	componentDidMount() {
		console.log(this.props)
		return Promise.all([
			// Comment the lines which you do not use
			this.firebaseCheck(),
			// this.auth0Check(),
			// this.jwtCheck()
		]).then((res) => {
			console.log(res)
			this.setState({ ...this.state,waitAuthCheck: false });
		}).catch(err=>{console.log(err)});
	}

	// jwtCheck = () =>
	// 	new Promise(resolve => {
	// 		jwtService.on('onAutoLogin', () => {
	// 			this.props.showMessage({ message: 'Logging in with JWT' });
	// 			console.log("JWT Check yaay")
	// 			/**
	// 			 * Sign in and retrieve user data from Api
	// 			 */
	// 			jwtService
	// 				.signInWithToken()
	// 				.then(user => {
	// 					this.props.setUserData(user);

	// 					resolve();

	// 					this.props.showMessage({ message: 'Logged in with JWT' });
	// 				})
	// 				.catch(error => {
	// 					this.props.showMessage({ message: error });

	// 					resolve();
	// 				});
	// 		});

	// 		jwtService.on('onAutoLogout', message => {
	// 			if (message) {
	// 				this.props.showMessage({ message });
	// 			}

	// 			this.props.logout();

	// 			resolve();
	// 		});

	// 		jwtService.on('onNoAccessToken', () => {
	// 			resolve();
	// 		});

	// 		jwtService.init();

	// 		return Promise.resolve();
	// 	});

	// auth0Check = () =>
	// 	new Promise(resolve => {
	// 		auth0Service.init(success => {
	// 			if (!success) {
	// 				resolve();
	// 			}
	// 		});

	// 		if (auth0Service.isAuthenticated()) {
	// 			this.props.showMessage({ message: 'Logging in with Auth0' });

	// 			/**
	// 			 * Retrieve user data from Auth0
	// 			 */
	// 			auth0Service.getUserData().then(tokenData => {
	// 				this.props.setUserDataAuth0(tokenData);

	// 				resolve();

	// 				this.props.showMessage({ message: 'Logged in with Auth0' });
	// 			});
	// 		} else {
	// 			resolve();
	// 		}

	// 		return Promise.resolve();
	// 	});

	firebaseCheck = () =>
		new Promise((resolve,reject) => {
			firebaseService.init(success => {
				if (!success) {
					console.log("Firebase failed")
					// reject("Sighhh");
					resolve()
				}
				else{
					console.log("Firebase service working")
						// resolve("Yayy")
			}
				
			});


			firebaseService.getRedirectCode().then(res=>{
				console.log(res.isNewUser)
				console.log(res.message)
				if(res.isNewUser){
					this.setState({...this.state,isNewUser:res.isNewUser,friends_count:res.friends_count,followers_count:res.followers_count})
				}
				console.log(this.state)

			})

			firebaseService.onAuthStateChanged(authUser => {
				if (authUser) {
					this.props.showMessage({ message: 'Logging in with Firebase auth service' });
					console.log("auth exists")
					console.log(authUser)
					console.log("new user state is")
					console.log(this.state.isNewUser)
					
					authUser.isNewUser=this.state.isNewUser
					console.log(authUser.additionalUserInfo)
					console.log(this.props)
					console.log(authUser)
					// console.log(firebaseService.getCurrentUser())
					// console.log(authUser.getIdToken())
					// console.log(authUser.getAuthResponse().id_token)
					// firebaseService.addAuthUserData(authUser)
					
					console.log("line")
					/**
					 * Retrieve user data from Firebase
					 */
					let user={}
					console.log("Auth function is working")
					// this.props.setUserDataFirebase(authUser,authUser);
					// resolve();

					this.props.showMessage({ message: 'Logged in with Firebase auth service' });

				

					firebaseService.getUserData(authUser.uid).then(
						user => {
							console.log(user)
							if(this.state.isNewUser){
								user.isNewUser=this.state.isNewUser
								user.friends_count=this.state.friends_count
								user.followers_count=this.state.followers_count
							}
							this.props.setUserDataFirebase(user, authUser);
							

							resolve();

							this.props.showMessage({ message: 'Logged in with Firebase' });
						},
						error => {
							resolve();
						}
					).catch(err=>{
						console.log(err)
						console.log("Couldnt retrieve getUser Data")});

						console.log("Get data finished")
				}
				 else {
					console.log("no auth user")
					firebaseService.addUserData("rando")
					resolve();
				}
			});

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			setUserData: userActions.setUserData,
			setUserDataAuth0: userActions.setUserDataAuth0,
			setUserDataFirebase: userActions.setUserDataFirebase,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage,
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
