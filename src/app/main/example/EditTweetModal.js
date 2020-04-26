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
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import {  KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea } from '@material-ui/core';


var currentDate=moment().format("MMM DD, hh:mm a")
const useStyles = makeStyles(theme => ({
	layoutRoot: {
		// height:"100vh"
		
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
		overflow:'scroll',
		
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
		// width: '45%',
		
		[theme.breakpoints.down('md')]: {
			width:"90%",
			marginRight:"20px",
			marginLeft:"5px"
		  },
		  [theme.breakpoints.down('sm')]: {
			width:"95%",
			marginRight:"20px"
		  },
		// overflow:'scroll',
		// backgroundColor: theme.palette.background.paper,
		backgroundColor:"#F8FAF9",
	
	  //   border: '2px solid #000',
		borderRadius:"15px",
		boxShadow: theme.shadows[10],
		// padding: theme.spacing(2, 4, 3),
		marginTop:"4%",
		marginLeft:"2%",
		width:"60%",
		minHeight:"30%",
		outline:0,
		
	  },
	  addMargin:{
		  marginTop:"25px"
	  },
	  iconButtonHover:{
		"&:hover":{
			background:"#FFF"
		},
		"&::before":{
			backgroundColor: "white",
			content: '""',
			display:"block",
			height: "10px",
			position: "absolute",
			width:"10px",
			marginLeft:"69px",
			marginTop:"0px",
			top:"-3px"
			
		}

	  },
	  
	  actionArea:{
		  '&:hover $focusHighlight':{
			  opacity:0,
		  }
	  },
	  focusHighlight: {},
	  buttonDisabled:{
		color:"#FFF !important",
		opacity:0.5
		
	  }
	  
		 
		 
	  
}));

function TweetModal(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	const [displayEditTweet,setDisplayEditTweet]=useState('')
	const dispatch = useDispatch();
	const dialogstate = useSelector((state) => state);
	const inputFile = useRef(null) 
	const [displayDateTimePicker,setDisplayDateTimePicker]=useState(true)
	const [postTime,setPostTime]=useState(currentDate)
	const tweetState=useSelector(({customReducers})=>customReducers.upload)
	const dateState=useSelector(({customReducers})=>customReducers.displayDate.open)
    const scheduledTweetState=useSelector(({customReducers})=>customReducers.scheduledTweets)
console.log(scheduledTweetState)
console.log(props.editTweetIndex)
console.log(scheduledTweetState[props.editTweetIndex])

	



	const uploadImage=()=>{
		console.log("Uploading... file...")
		inputFile.current.click()
	}
	const [selectedDate,handleDateChange]=useState(moment(new Date()))

  console.log(tweetState)
  console.log(dialogstate)

	console.log(props)
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

		for(let i=0;i<tweetState.tweet.length;i++){
			if(tweetState.tweet[index].status.length >= 0){
				props.setIsButtonDisabled(true)
				break;
			}
			else {
				props.setIsButtonDisabled(false)
			}
		}
	}
	const setTweet=(event,index)=>{

		props.setTweet(event.target.value,index)
	}

	const displayEdit=()=>{
		console.log("Element is focussed")
		setDisplayEditTweet("")
	}
	const displayEditDate=()=>{
		props.displayDate()
	}

	const testUpload=()=>{
	// const fd=new FormData()
	// fd.append('ppgrade',props.customReducers.upload.file,props.customReducers.upload.file.name)
	var ppGrade=firebase.getRootRef().child('ppgrade.jpg')
	ppGrade.put(props.currentState.customReducers.upload.tweet).then(function(snapshot) {
		console.log('Uploaded a blob or file!');
	  }); 
	}
console.log(props.currentState.customReducers.upload.tweet)
	useEffect(()=>{

		props.fetchGivenTweetEdit(scheduledTweetState[props.editTweetIndex])


	},[])
	return (
		<main style={{overflowY:"scroll"}}>     
		<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
		  timeout: 500,
		  style:{background:'rgba(82, 82, 87, 0.8)', }
		}}
		
		
		
      >
        <Fade in={props.open}>
		  <div 
		  className={classes.paper} 
		  style={{background:"",
		//   display:"flex",
	
		  justifyContent:"flex-start"}} >
		  {/* <Box height="80%" style={{overflow:"scroll",maxHeight:"150%"}}> */}
		 
		  <Card 
		  elevation={0}
		  style={{width:"90%",
		//   boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",
		  borderRadius:"15px",
				marginLeft:"5%",
				marginRight:"2%",
				marginTop:"2%",
				height:"40%",
				minHeight:"40%",
				background:"transparent",
				borderStyle:"none",
			

		}} 
		  className="w-full items-end overflow-hidden"
		  >

			
		 {scheduledTweetState[0]==0 ? null:scheduledTweetState[props.editTweetIndex].tweet.map((value,index)=>
	
					<Card key={index}
					 style={{
					width:"",
					 boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",
				
					borderRadius:"15px",}}
					//  className="w-full items-end overflow-hidden"
					className={clsx("w-full", "items-end" ,"overflow-hidden",((index !=0) && classes.addMargin))}
					 
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
						onChange={(event)=>props.setTweetWrapper(event,index)}
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
						value={value.status}
					
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
						onClick={(event)=>props.removeSubTweet(index)}
						style={{
							// background:"pink"
						}} size="small">
						<DeleteIcon  />
						</IconButton>
						</Box>

					</Box>
				
					{scheduledTweetState[props.editTweetIndex].tweet[0].tweet_image ? <Box style={{width:"100%",height:"80px",marginLeft:"10px",background:""}}>
					
					<Icon 
					component="button"
					onClick={(event)=>props.tempImageRemove(event,index)}
					style={{marginLeft:"67px",position:"relative",
					marginBottom:"",top:"-5px",marginTop:0,cursor:"pointer",zIndex:8}}
					>highlight_off
					</Icon>
						<CardActionArea
						disableTouchRipple
						style={{height:"70px",
						background:"",
						marginTop:"-20px",
					
						border:"1px dashed black",

						width:"80px"}}
						classes={{
							root: classes.actionArea,
							focusHighlight: classes.focusHighlight
						}}
						className={classes.iconButtonHover}
						>							
						<CardMedia
						component="img"
						height="140"
						className={classes.media}
						src={props.imageTempUrl}
						title=""
						style={{
						height:"50px",
						margin:"auto",
						marginTop:"7px",
						// marginLeft:"auto",
						// marginBottom:"15px",
						// marginTop:"2px",
						width:"80%",
						marginBottom:"10px"}}
						/>
						</CardActionArea>
						   	
						</Box>:null}
					


					
							
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
									<input style={{display:"none"}} multiple ref={inputFile} type="file" accept="image/*" onChange={(event)=>props.imageSelectedHandler(event,index)}>
									</input>
									
								
								</div>
								<div className="flex items-center" style={{marginRight:"10px"}}>
							<Typography>{scheduledTweetState[props.editTweetIndex].tweet[index].status.length}</Typography>
								</div>
								<div className="flex items-center"  style={{marginRight:"10px"}}>
								<Typography>{index+1+"/"+scheduledTweetState[props.editTweetIndex].tweet.length}</Typography>
								</div>
								<div className="p-8">
								
								<IconButton onClick={()=>addTweet(index)} style={{textAlign:"right",marginRight:"10px"}} size="small" aria-label="Add location">
										<Icon style={{background:"",color:"green"}}>circle_add</Icon>
									</IconButton>
									
								</div>
							</AppBar>
							
									</Card>	
							
						
							)	}
							
							
									
					
					</Card>	
					<Grid container >

						<Grid item lg={6} md={6} style={{display:"flex",alignItems:"center",}}>

				{dateState ? <div style={{marginLeft:"40px"}}><KeyboardDateTimePicker

								variant="inline"
								ampm={false}
								// label="With keyboard"
								inputVariant="outlined"
								value={selectedDate}
								onChange={handleDateChange}
								onError={console.log}
								style={{marginLeft:"15px"}}
								disablePast
								format="DD/MM/YYYY HH:mm"
								style={{marginTop:"10px",marginLeft:"15px"}}
								/></div>:<div style={{marginLeft:"50px"}}>{postTime}</div>}			
								{dateState ? <IconButton onClick={props.hideEditDate}><DoneIcon /></IconButton>:<IconButton onClick={displayEditDate}><EditIcon/></IconButton>}	
											</Grid>
					<Grid item lg={3} 
					md={3}
					sm={6}
					xs={6} 
					style={{
						display:"flex",
					justifyContent:"flex-end",

				// background:"pink",
				flexGrow:2,
				}}
					>
								<Button 
									
									variant="contained" 
									disabled={props.isButtonDisabled}
									style={{
										backgroundImage:"linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%)",
										fontSize:"13px",
										marginRight:"8px",
										borderRadius:"7px",
										padding:"9px 24px",
										textTransform:"none",
										// opacity:0.5,
										width:"70%",
										marginTop:"18px",
										marginBottom:"18px"

								
								}} 
								classes={{disabled:classes.buttonDisabled}}
									onClick={props.testUpload}
									 color="primary"
									  size="small"
									   aria-label="post">
										Save to Drafts
									</Button>
								

					</Grid>
					<Grid item lg={3} md={3} sm={6} xs={6} 
					style={{
						display:"flex",
					justifyContent:"center",
				
					// background:"orange"
					 }}>


					
					<Button 
									
									variant="contained" 
									disabled={props.isButtonDisabled}
									style={{
										backgroundImage:"linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%)",
										fontSize:"13px",
										marginRight:"30px",
										borderRadius:"7px",
										padding:"9px 24px",
										textTransform:"none",
										// opacity:0.5,
										width:"70%",
										marginTop:"18px",
										marginBottom:"18px"

								
								}} 
								classes={{disabled:classes.buttonDisabled}}
									onClick={props.testUpload}
									 color="primary"
									  size="small"
									   aria-label="post">
										Schedule
									</Button>
								
									</Grid>


								</Grid>
		  
				</div>
		  
        </Fade>
		
      </Modal>
	  </main>
	);
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setUpload:customactions.setUpload,
			setStatus:customactions.setStatus,
			addSubtweet:customactions.addSubtweet,
			setTweet:customactions.setTweet,
			displayDate:customactions.displayEditDate,
			hideEditDate:customactions.hideEditDate,
			removeSubTweet:customactions.removeSubTweet
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}


function mapStateToProps(state){
	return {currentState:state}
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetModal);
