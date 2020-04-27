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
import Box from '@material-ui/core/Box';
// import {ui} from 'app/services/firebaseService/firebaseUi.js'
const useStyles = makeStyles(theme => ({
	root: {
		// background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText,
		// background:"#F7F7F7"
		background:"#FFF"
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
	
		const getRedirectCodeResult=async ()=>{
		var result=await firebase.getRedirectCode().catch(err=>console.log(err))
		console.log(result)
		console.log("Redirect code finished working")
		}
		getRedirectCodeResult()
		
		
	
	},[]) 
	
	console.log(props)

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>

	


			<div className="flex flex-row items-center justify-center w-full" style={{background:""}}>
				{/* <img className="w-128 m-32" src="assets/images/illustration-team-management-cartoon-flat/3998.jpg" /> */}
				<Card className="w-3/4 " elevation={0} style={{background:"",marginLeft:""}}>
				<CardContent className="flex justify-center" style={{background:"",}}>
				<img className="" style={{height:"80vh",width:"100vh"}} src="assets/images/illustration-team-management-cartoon-flat/3998.jpg" />

				</CardContent>
				</Card>
				
				
				<FuseAnimate animation="transition.expandIn">
					<Card elevation={0} className="w-1/4 max-w-384" style={{background:"blue"}}>

						<CardContent className="flex flex-col items-center justify-center p-32">
						<Box><Typography style={{fontSize:"28px",fontWeight:800,display: 'inline-block',marginRight:"5px"}}> Publicity</Typography>
						<Typography style={{display: 'inline-block',fontSize:"28px",fontWeight:800,color:"#55c3b7"}}> Bandit</Typography></Box>	
							<Typography  style={{fontSize:"18px",fontWeight:400,color:""}}>Signin Or Signup</Typography>
							<img className="w-128 m-32" src="assets/images/logos/premiumlogo (1)/onlinelogomaker-042620-1851-3683.png" alt="logo" />

						

							<Button id="twitter-login" 
							style={{
								backgroundImage:"linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%)"
								// background:"#55acee"

							}}
							variant="contained" 
							startIcon={<TwitterIcon/>} 
							onClick={()=>firebase.signinRedirect()}
							 color="primary" size="small" className="normal-case w-192">
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
