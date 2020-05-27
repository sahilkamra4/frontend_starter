import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from 'react-redux';
import firebase from 'app/services/firebaseService';
import * as customactions from 'app/store/actions/customactions';
import * as authactions from 'app/auth/store/actions/user.actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { uuid } from 'uuidv4';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import axios from 'axios';
import uuidv4 from 'uuidv4';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import './button.css'
var momentZones = require('moment-timezone');

const useStyles = makeStyles(theme => ({
	layoutRoot: {
		// height:"100vh",
		// default green color for text is #20c997;
	},

	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider,
		marginLeft: '15px'
	},
	modal: {
		display: 'flex',
		alignItems: 'top',
		justifyContent: 'center'

		// outline:0
		// top: "10%",
		// left: "15%",
		// transform: `translate(-10%, -15%)`,
	},
	//   paper: {
	// 	backgroundColor: theme.palette.background.paper,
	// 	// border: '2px solid #000',
	// 	boxShadow: theme.shadows[5],
	// 	padding: theme.spacing(2, 4, 3),
	// 	maxHeight:"40%",
	// 	// height:"auto",width:"60%",
	// 	// maxHeight:"auto",
	// 	// overflow:"scroll",
	// 	// overflowY:"scroll",
	// 	// marginTop:"5%",marginLeft:"5%",
	// 	// minHeight:"auto",
	// 	outline:0
	//   },
	paper: {
		position: 'absolute',
		width: '45%',

		[theme.breakpoints.down('md')]: {
			width: '80%',
			marginRight: '20px'
		},
		// overflow:'scroll',
		// backgroundColor: theme.palette.background.paper,
		// backgroundColor:"#F5F5F5",
		// backgroundColor:"red",
		//   border: '2px solid #000',
		borderRadius: '25px',
		boxShadow: theme.shadows[10],
		// padding: theme.spacing(2, 4, 3),
		marginTop: '8%',
		marginLeft: '5%',

		outline: 0
	},
	scheduledTweetCard: {
		'&:hover': {
			cursor: 'pointer'
		},
		//   opacity:0.5,
		borderStyle: 'none',
		boxShadow: '0 0 1.25rem rgba(31,45,61,.08)',
		borderLeft: '4px solid green',
		minHeight: '10vh',
		width: '90%',
		borderRadius: '15px'
	},
	iconButtonHover: {
		'&:hover': {
			background: '#FFF'
		},
		'&::before': {
			backgroundColor: 'white',
			content: '""',
			display: 'block',
			height: '10px',
			position: 'absolute',
			width: '10px',
			marginLeft: '69px',
			marginTop: '0px',
			top: '-3px'
		}
	},
	actionArea: {
		'&:hover $focusHighlight': {
			opacity: 0
		}
	},
	focusHighlight: {},
	buttonDisabled: {
		color: '#FFF !important',
		opacity: 0.5
	},
	cssLabel: {
		color: 'green'
	},

	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: `#5fd0a5 !important`
		}
	},

	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: '#66da90 !important'
	}
}));

function getSteps() {
	return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return `For each ad campaign that you create, you can control how much
				you're willing to spend on clicks and conversions, which networks
				and geographical locations you want your ads to show on, and more.`;
		case 1:
			return 'An ad group contains one or more ads which target a shared set of keywords.';
		case 2:
			return `Try out different ad text to see what brings in the most customers,
				and learn how to enhance your ads using features like ad extensions.
				If you run into any problems with your ads, find out how to tell if
				they're running and how to resolve approval issues.`;
		default:
			return 'Unknown step';
	}
}

var currentDate = moment().format('MMM DD, hh:mm a');

function SetupPage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	// const [displayEditTweet,setDisplayEditTweet]=useState('')
	const dispatch = useDispatch();
	const dialogstate = useSelector(state => state);
	const inputFile = useRef(null);
	const tweetState = useSelector(({ customReducers }) => customReducers.upload);
	const dateState = useSelector(({ customReducers }) => customReducers.displayDate.open);
	const scheduledTweets = useSelector(({ customReducers }) => customReducers.scheduledTweets);
	const [loading, setLoading] = useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [placement, setPlacement] = React.useState();
	const [open, setOpen] = React.useState(false);
	const [timeZoneList, setTimeZoneList] = useState([]);
	const [selectedZone, setSelectedZone] = useState('');
	const [allTimeZones, setAllTimeZones] = useState([]);
	const [stripeErrorMsg, setStripeErrorMsg] = useState('');
	// const [imageTempUrl,setTempUrl]=useState("")
	// const [isButtonDisabled,setIsButtonDisabled]=useState(true)
	// const [editOpen,setEditOpen]=useState(false)
	// const [editTweetIndex,setEditTweetIndex]=useState(0)

	// Rollbar.debug("loaded example")
	// const rollbar=window.Rollbar

	const saveTimeZoneData = () => {
		setLoading(true);
		firebase
			.saveTimeZone({ selectedZone: selectedZone, uid: dialogstate.auth.user.uid })
			.then(res => {
				props.updateRole(['admin']);
				props.history.push('/dashboard');
			})
			.catch(err => {
				console.log(err);
				props.showMessage({ variant: 'error', message: 'Unexpected Error Occured', autoHideDuration: 2000 });
				setLoading(false);
			});
	};

	console.log(scheduledTweets);
	// const [postTime,setPostTime]=useState(currentDate)
	console.log(tweetState);
	const postTime = tweetState.post_time_formatted;
	const uploadImage = () => {
		console.log('Uploading... file...');
		inputFile.current.click();
	};

	console.log(tweetState);
	console.log(dialogstate);

	console.log(props);

	const addTweet = index => {
		console.log(index);
		props.addSubtweet(index);
	};

	// const displayEdit=()=>{
	// 	console.log("Element is focussed")
	// 	setDisplayEditTweet("")
	// }
	const testfunc = () => {
		props.showMessage({ message: 'Tweet Scheduled Successfully', autoHideDuration: 2000, variant: 'success' });
	};

	console.log(props.currentState.customReducers.upload.tweet);

	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const uid = props.currentState.auth.user.uid;

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const selectZone = value => {
		setSelectedZone(value);
		setOpen(false);
	};
	const handleStripe = event => {
		event.preventDefault();
		console.log('CLicked handle stripe');
		// setLoading(true)
		axios
			.get('http://localhost:5001/publicity-bandit/us-central1/handleStripeConnect/get-oauth-link', {
				withCredentials: true
			})
			// .then(response => {
			// 	console.log(response)
			// 	response.json();})
			.then(result => {
				if (result.data.url) {
					// window.location = data;
					console.log(result);
					console.log(props);
					console.log(props.history);
					window.location = result.data.url;
				} else {
					setStripeErrorMsg('An error occured');
					// setLoading(false)
					console.log('data', result);
				}
			});
	};

	const handleCampaignClick = () => {
		props.history.push('/campaigns/campaignId');
	};

	//   console.log(timezones)

	// var dateToday=momentZones(new Date())
	// console.log(dateToday.format("DD MM YY HH:mm"))
	// var zn_details=momentZones().tz(selectedZone).format("ha z")
	// console.log(zn_details)
	// var losAngeles=dateToday.clone().tz("America/Los_Angeles").format("dd mm yy HH:mm")
	// console.log(losAngeles)
	// console.log(timezones.length)

	console.log(timeZoneList);
	const handleTimeZone = (newPlacement, event) => {
		console.log(event.target.value);
		var val = event.target.value;
		setSelectedZone(val);
		var newZone = [];
		if (val.length > 0) {
			const regex = new RegExp(`^${event.target.value}`, 'i');
			newZone = allTimeZones.filter(zone => regex.test(zone));
			setTimeZoneList(newZone);
		}

		if (newZone.length > 0) {
			setOpen(true);
		} else {
			setOpen(false);
		}

		setAnchorEl(event.currentTarget);

		setPlacement(newPlacement);
	};
	//   const displayEditDate=()=>{
	// 	props.displayDate()
	// }

	useEffect(() => {
		// firebase.getRedirectCode()
		// var result=	firebase.getUserData(uid)
		// console.log(result)
		// getScheduledPostData()
		const getScheduledPostData = async () => {
			var data = await firebase.getScheduledTweets(dialogstate.auth.user.uid).catch(err => console.log(err));
			console.log(data);
			props.setScheduledTweets(data);
			var guessedZone = momentZones.tz.guess(true);
			var timezones = momentZones.tz.names();
			setAllTimeZones(timezones);
			setSelectedZone(guessedZone);
			// console.log(data)
			setLoading(false);
			return;
		};
		getScheduledPostData();
		// var data=await firebase.getScheduledTweets(dialogstate.auth.user.uid).catch(err=>console.log(err))
		// props.setScheduledTweets(data)
	}, []);
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			// header={
			// 	<div className="p-24">
			// 		<h4>{t('TITLE')}</h4>
			// 	</div>
			// }
			// contentToolbar={
			// 	<div className="px-24">
			// 		<h4>Content Toolbar</h4>
			// 	</div>
			// }

			content={
				<div
					className="p-24"
					style={{
						textAlign: '',
						// background:"#f8faf9"
						background: '#F8FAF9',
						minHeight: '91.9vh'
					}}
				>
					{loading ? (
						<div>
							<LinearProgress style={{ color: 'green' }} />
						</div>
					) : (
						<Grid container style={{ justifyItems: 'center', justifyContent: 'center' }}>
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<br />
							</Grid>

							{/* <Typography style={{ fontSize: '28px', fontWeight: 800 }}>
								Welcome to Publicity Bandit{' '}
							</Typography> */}

							<Grid
								item
								lg={12}
								md={12}
								sm={12}
								xs={12}
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<Card className={classes.root} style={{ width: '55%' }}>
									<CardContent>
										{/* <Typography>All Campaigns</Typography>
										<Button>Create new campaign</Button> */}
										<Typography>Edit Campaign</Typography>
										<Grid container>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Campaign Name"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Website URL"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Commission"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Maximum Commission Per Customer"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Cookie Window"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
											<Grid item lg={12} md={12} sm={12}>
												<TextField
													id="standard-multiline-flexible"
													label="Days before commission becomes due"
													multiline
													rowsMax={4}
													variant="outlined"
													// value={value}
													// onChange={handleChange}
												/>
											</Grid>
										</Grid>
									</CardContent>
									<CardActions style={{ justifyContent: 'flex-end' }}>
										<Button
											onClick={saveTimeZoneData}
											variant="contained"
											style={{
												backgroundImage:
													'linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%)'
											}}
										>
											<Typography style={{ color: '#FFF' }}>Update Campaign</Typography>
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					)}
				</div>
			}
		/>
	);
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setUpload: customactions.setUpload,
			setStatus: customactions.setStatus,
			addSubtweet: customactions.addSubtweet,
			setTweet: customactions.setTweet,
			setDownloadUrl: customactions.setDownloadUrl,
			resetState: customactions.resetState,
			saveTweet: customactions.saveTweet,
			showMessage: Actions.showMessage,
			displayDate: customactions.displayEditDate,
			hideEditDate: customactions.hideEditDate,
			handleDateChange: customactions.handleDateChange,
			setScheduledTweets: customactions.setScheduledTweets,
			removeUploadImage: customactions.removeUploadImage,
			// below are actions for editModal to set state

			setUploadEdit: customactions.setUploadEdit,
			setStatusEdit: customactions.setStatusEdit,
			addSubtweetEdit: customactions.addSubtweetEdit,
			setTweetEdit: customactions.setTweetEdit,
			setDownloadUrlEdit: customactions.setDownloadUrlEdit,
			saveTweetEdit: customactions.setTweetEdit,
			resetStateEdit: customactions.resetStateEdit,
			handleDateChangeEdit: customactions.handleDateChangeEdit,
			removeUploadImageEdit: customactions.removeUploadImageEdit,
			removeSubTweetEdit: customactions.removeSubTweetEdit,
			fetchTweetEdit: customactions.fetchTweetEdit,

			updateRole: authactions.updateRole
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return { currentState: state };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetupPage);
