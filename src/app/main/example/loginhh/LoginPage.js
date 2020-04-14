import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
// import {firebaseUi}from 'app/services/firebaseService'
import { useSelector } from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import * as firebaseui from 'firebaseui'
import firebase from 'app/services/firebaseService'
import TwitterIcon from '@material-ui/icons/Twitter';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {ui} from 'app/services/firebaseService/firebaseUi.js'
const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));
// const uiConfig = {
//     signInSuccessUrl: '/',
//     // signInOptions: [ firebase.auth.EmailAuthProvider.PROVIDER_ID, ],
//     tosUrl: '/'
// };

function LoginPage(props) {
	
	const classes = useStyles();
	const allRedux = useSelector((sol) => sol);
	console.log(allRedux)
	const { form, handleChange, resetForm } = useForm({
		email: '',
		password: '',
		remember: true
	});
	
	
	function isFormValid() {
		return form.email.length > 0 && form.password.length > 0;
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		resetForm();
	}
	useEffect(()=>{
	
			firebase.getRedirectCode()
		
		
	
	}) 
	
	console.log(props)

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
			
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
					
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

						

							<Button id="twitter-login" variant="contained" startIcon={<TwitterIcon/>} onClick={()=>firebase.signinRedirect()} color="primary" size="small" className="normal-case w-192">
								Log in with Twitter
							</Button>

						
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{

			getAuthFunc:userActions.getAuthFunction,
			getAuthProp:userActions.getAuthProp,
		},
		dispatch
	);
}


export default connect(null, mapDispatchToProps)(LoginPage);
