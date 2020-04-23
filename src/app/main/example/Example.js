import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{useEffect,useRef,useState} from 'react';
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
import firebase from 'app/services/firebaseService'
import * as customactions from 'app/store/actions/customactions'
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
import TweetModal from './TweetModal'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import DeleteIcon from '@material-ui/icons/Delete';
import {uuid} from 'uuidv4'


const useStyles = makeStyles(theme => ({
	layoutRoot: {
		// height:"100vh",
	// default green color for text is #20c997;
		
	},

	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider,
		marginLeft:"15px"
	},
	modal: {
		display: 'flex',
		alignItems: 'top',
		justifyContent: 'center',
		
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
			width:"80%",
			marginRight:"20px"
		  },
		// overflow:'scroll',
		// backgroundColor: theme.palette.background.paper,
		// backgroundColor:"#F5F5F5",
		// backgroundColor:"red",
	  //   border: '2px solid #000',
		borderRadius:"25px",
		boxShadow: theme.shadows[10],
		// padding: theme.spacing(2, 4, 3),
		marginTop:"8%",
		marginLeft:"5%",
		
		outline:0,
		
	  },
	  scheduledTweetCard:{
		  '&:hover':{
			cursor:"pointer",
			
		  },
		//   opacity:0.5,
		  borderStyle:"none",
				boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",
				borderLeft:"4px solid green",
				minHeight:"10vh",
				width:"90%",
				borderRadius:"15px"
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
  


function ExamplePage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	const [displayEditTweet,setDisplayEditTweet]=useState('')
	const dispatch = useDispatch();
	const dialogstate = useSelector((state) => state);
	const inputFile = useRef(null) 
	const tweetState=useSelector(({customReducers})=>customReducers.upload.tweet)
	const uploadImage=()=>{
		console.log("Uploading... file...")
		inputFile.current.click()
	}
	const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
	//   alert("Are you sure you want to close the modal")
    setOpen(false);
  };

  console.log(tweetState)
  console.log(dialogstate)

	console.log(props)

	// this function adds image to redux
	const imageSelectedHandler=(event,index)=>{
		var files= event.target.files
		if(files.length >4){
			console.log("Cannt upload more than 4 files")
		}
		for(let i=0;i<files.length;i++){

		}
		console.log(event.target.files[0])
		console.log(event.target.files[0].type)
		
		if(event.target.files[0].type !='image/png'  && event.target.files[0].type != 'image/jpeg' ){
			console.log("unsupported file type")
			// if(ev)

			console.log(event.target.files[0].type != 'image/jpeg')
			console.log(event.target.files[0].type !='image/png')
		}
		else{
		props.setUpload(event.target.files[0],index)
		}
	}

	const addTweet = (index) =>{
		console.log(index)
		props.addSubtweet(index)
	}
	const setTweet=(event,index)=>{

		props.setTweet(event.target.value,index)
	}

	const displayEdit=()=>{
		console.log("Element is focussed")
		setDisplayEditTweet("")
	}
	const testfunc=()=>{
		props.showMessage({message: 'Tweet Scheduled Successfully',autoHideDuration:2000,variant:'success'})

	}

	const testUpload=async ()=>{
	// const fd=new FormData()
	// fd.append('ppgrade',props.customReducers.upload.file,props.customReducers.upload.file.name)
	console.log("Example test upload working")
	let tweet_id=uuid()
	//   function for sending this to send it to firestore
	for (let item in tweetState){
		if(tweetState[item].tweet_image && tweetState[item].tweet_image != ""){
		console.log(tweet_id)
		var image_ref=firebase.getRootRef().child(`${dialogstate.auth.user.uid}/${tweet_id}/${tweetState[item].tweet_image.name}.jpg`)
		let snapshot= await image_ref.put(tweetState[item].tweet_image).catch(err=>console.log(err))
		console.log('Uploaded a blob or file!');
		let downloadURL=await snapshot.ref.getDownloadURL().catch(err=>console.log(err))
		console.log("File available at", downloadURL);
		props.setDownloadUrl(downloadURL,item)
		
		}
		  
	}
	let user_id=dialogstate.auth.user.uid
	console.log(user_id)
	await props.saveTweet(tweet_id,user_id)
	props.showMessage({message: 'Tweet Scheduled Successfully',autoHideDuration:2000,variant:"success"})
	console.log("tweet saved")
}
console.log(props.currentState.customReducers.upload.tweet)

const [activeStep, setActiveStep] = React.useState(0);
const steps = getSteps();

const uid=props.currentState.auth.user.uid

const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


	useEffect(()=>{
		// firebase.getRedirectCode()
	// var result=	firebase.getUserData(uid)
	// console.log(result)

	}	)
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

				<div className="p-24" 
				style={{textAlign:"",
				// background:"#f8faf9"
				background:'#F8FAF9',
				minHeight:'91.9vh'
		
				}}>
					<Grid container style={{justifyItems:"center",justifyContent:"center"}}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
					<Typography>Scheduled Tweets </Typography>
					<br />
					</Grid>
					{/* <DemoContent /> */}
							<Grid item lg={7} md={7} sm={8} xs={8} >	
							<Card
					 style={{
					width:"",
					 boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",
				
					borderRadius:"15px",}}
					//  className="w-full items-end overflow-hidden"
					className={clsx("w-full", "items-end" ,"overflow-hidden")}
					 
					 >
					{/* <div style={{
						textAlign:"right",
						// background:"red",
						marginTop:"2px",
						// marginBottom:"-35px",
						marginRight:"20px"
						}}> */}
						
						{/* </div> */}
					{/* <div className={classes.separator} /> */}

					<Box style={{display:"flex",}}>
						<Box style={{marginRight:"7px",
							marginTop:"0px",
							alignItems:"start",
							marginTop:"8px",
							marginLeft:"10px",
							flexShrink:3,
							// background:"red"
							}}>
						<Avatar
							style={{
							

						}}
							className={clsx(classes.avatar, 'avatar')}
							alt="user photo"
							src={
								props.currentState.auth.user.data.photoURL && props.currentState.auth.user.data.photoURL !== ''
									? props.currentState.auth.user.data.photoURL
									: 'assets/images/avatars/profile.jpg'
							}
						/>
						</Box>
						<Box style={{width:"100%",flexGrow:4}} >
						<Input
						
						onFocus={displayEdit}
						className="p-16 w-full"
						onChange={(event)=>setTweet(event,0)}
						style={{borderRadius:"25px"
						// ,marginTop:"-50px"
					}}
						classes={{ root: 'text-14' }}
						placeholder="Write something.."
						multiline
						rows="3"
						rowsMax="8"
						margin="none"
						disableUnderline
						value={tweetState[0].status}
					
						// classes={{adornedStart: {
						// 	marginTop:0,
						// 	verticalAlign:"text-top",display:"inline-block"
						//   },}}
					/>
					
						</Box>
						<Box 
						style={{
						
						justify:"flex-end",
						alignItems:"start",
						justifyContent:"flex-end",
						// background:"purple",
						marginTop:"4px",
						marginRight:"10px",
						flexShrink:3
						
						}}>
						<IconButton 
						style={{
							// background:"pink"
						}} size="small">
						<DeleteIcon  />
						</IconButton>
						</Box>

					</Box>
					
					
					<AppBar
								className="card-footer flex flex-row border-t-1"
								position="static"
								color="default"
								elevation={0}
								style={{
								display:`${displayEditTweet}`,
								// borderStyle:"none",
								background:"white",
								// borderTop:"1px solid #20c997"

							}}
							>
								<div className="flex-1 items-center" style={{background:""}} >
									<IconButton 
									onClick={uploadImage} 
								
									
									aria-label="Add photo">
										<Icon>photo</Icon>
									</IconButton>
									<input style={{display:"none"}} multiple ref={inputFile} type="file" accept="image/*" onChange={(event)=>imageSelectedHandler(event,0)}>
									</input>
									
								
								</div>

								<div className="p-8">
								<IconButton onClick={handleOpen} style={{textAlign:"right",marginRight:"10px"}} size="small" aria-label="Add location">
										<Icon style={{background:"",color:"#20c997"}}>circle_add</Icon>
									</IconButton>
									
					<Button 
									
									variant="contained" 
									disabled={false}
									style={{
										backgroundImage:"linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%)",
										fontSize:"13px",
										// marginRight:"30px",
										borderRadius:"7px",
										padding:"9px 24px",
										textTransform:"none",
										// opacity:0.5,
										// width:"70%",
										// marginTop:"18px",
										// marginBottom:"18px"

								
								}} 
									onClick={testUpload}
									 color="primary"
									  size="small"
									   aria-label="post">
										Schedule
									</Button>
								
								</div>
							</AppBar>
							
									</Card>	
							
						
					</Grid>
				
				
				
				
				
				<Grid item lg={8} md={8} sm={8} xs={8}>
			
				<button type="button" onClick={testfunc}>
        react-transition-group
      </button>
	  

			<TweetModal open={open} testUpload={testUpload} handleClose={handleClose} imageSelectedHandler={imageSelectedHandler} />

				</Grid>

			<Grid item lg={10} md={10} sm={12} xs={12} style={{display:"flex",justifyContent:"center"}}>
				<Card elevation={0} 
					onClick={()=>console.log("Yayy")}
					// component="button"
					className={classes.scheduledTweetCard}
					style={{borderLeft:"4px solid #20c997"}}
					>
					<Grid container>
					<Grid item lg={2} md={2} sm={2} xs={2} 
					style=
					{{
					display:"flex",
					alignItems:"center"
					}}
					>

					
						{/* <Typography component="h2" 
						style={{
						marginLeft:"15px",
						marginTop:"25%",
						fontSize:"10px"
						}}>
							Scheduled For
						</Typography>
				 */}
						<Typography component="h4"
						style={{
							marginLeft:"15px",
							fontSize:"20px",
							
						}}
							
						>
							24 , Jan
							<br></br>
							9:15 am
						</Typography>
						{/* <Typography component="h4"
						style={{
							marginLeft:"15px",

						}}
							
						>
							9:15 am
						</Typography> */}


					</Grid>

					<Grid	item lg={10} md={10} sm={10} xs={10}>
					<Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} active={true}>
            <StepLabel></StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
               
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

					</Grid>



					<Grid	item lg={2} md={2} sm={2} xs={2}>
						<Button variant="contained">
						Edit Tweet
						</Button>

					</Grid>


					</Grid>
					
					
					</Card>
			</Grid>
				</Grid>
				</div>


			}

		
		/>
	);
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setUpload:customactions.setUpload,
			setStatus:customactions.setStatus,
			addSubtweet:customactions.addSubtweet,
			setTweet:customactions.setTweet,
			setDownloadUrl:customactions.setDownloadUrl,
			resetState:customactions.resetState,
			saveTweet:customactions.saveTweet,
			showMessage:Actions.showMessage,
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}


function mapStateToProps(state){
	return {currentState:state}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamplePage);
