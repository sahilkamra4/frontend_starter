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
		backgroundColor:"#F5F5F5",
	  //   border: '2px solid #000',
		borderRadius:"25px",
		boxShadow: theme.shadows[10],
		// padding: theme.spacing(2, 4, 3),
		marginTop:"8%",
		marginLeft:"5%",
		
		outline:0,
		
	  },
	  
}));

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
    setOpen(false);
  };

  console.log(tweetState)
  console.log(dialogstate)

	console.log(props)
	const imageSelectedHandler=(event)=>{
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
		props.setUpload(event.target.files[0])
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
		firebase.getRedirectCode()
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
				// background:'red',
		
				}}>
					<Grid container style={{justifyItems:"center",justifyContent:"center"}}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
					<Typography>Scheduled Tweets </Typography>
					<br />
					</Grid>
					{/* <DemoContent /> */}
							<Grid item lg={7} md={7} sm={8} xs={8} >	
						{tweetState.map((value,index)=>
					<Card key={index} style={{width:"",boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",borderRadius:"15px",}} className="w-full items-end overflow-hidden">

					{/* <div className={classes.separator} /> */}
						<Input
						
						startAdornment={	<Avatar
							style={{
							marginRight:"15px",
						}}
							className={clsx(classes.avatar, 'avatar')}
							alt="user photo"
							src={
								props.currentState.auth.user.data.photoURL && props.currentState.auth.user.data.photoURL !== ''
									? props.currentState.auth.user.data.photoURL
									: 'assets/images/avatars/profile.jpg'
							}
						/>}
						onFocus={displayEdit}
						className="p-16 w-full"
						onChange={(event)=>setTweet(event,index)}
						style={{borderRadius:"25px"}}
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
					
							
							<AppBar
								className="card-footer flex flex-row border-t-1"
								position="static"
								color="default"
								elevation={0}
								style={{display:`${displayEditTweet}`,borderStyle:"none",background:"white"}}
							>
								<div className="flex-1 items-center" style={{background:""}} >
									<IconButton onClick={uploadImage}  aria-label="Add photo">
										<Icon>photo</Icon>
									</IconButton>
									<input style={{display:"none"}} multiple ref={inputFile} type="file" accept="image/*" onChange={imageSelectedHandler}>
									</input>
									<IconButton aria-label="Mention somebody">
										<Icon>person</Icon>
									</IconButton>
								
								</div>

								<div className="p-8">
								<IconButton onClick={()=>addTweet(index)} style={{textAlign:"right",marginRight:"10px"}} size="small" aria-label="Add location">
										<Icon>circle_add</Icon>
									</IconButton>
									<Button variant="contained" onClick={testUpload} color="primary" size="small" aria-label="post">
										Schedule
									</Button>
								</div>
							</AppBar>
							
						</Card>	

					)}
					</Grid>
				<Grid item lg={8} md={8} sm={8} xs={8}>
				<h1>Scheduled Tweets</h1>
				<button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
	  <main>     
		<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
		  timeout: 500,
		  style:{background:'rgba(82, 82, 87, 0.8)',}
		}}
		
		
		
      >
        <Fade in={open}>
		  <div 
		  className={classes.paper} 
		  style={{background:"",display:"flex",justifyContent:"center"}} >
		  {/* <Box height="80%" style={{overflow:"scroll",maxHeight:"150%"}}> */}
		 
		  <Card style={{width:"",boxShadow: "0 0 1.25rem rgba(31,45,61,.08)",borderRadius:"15px",
		  
		}} 
		  className="w-full items-end overflow-hidden"
		  >
 		{tweetState.map((value,index)=>
				
					// <hr></hr>
					<div key={index}>
						<Input
						
						startAdornment={	<Avatar
							style={{marginRight:"15px",
							opacity:"0.2"
						}}
							className={clsx(classes.avatar, 'avatar')}
							alt="user photo"
							src={
								props.currentState.auth.user.data.photoURL && props.currentState.auth.user.data.photoURL !== ''
									? props.currentState.auth.user.data.photoURL
									: 'assets/images/avatars/profile.jpg'
							}
						/>}
						onFocus={displayEdit}
						className="p-16 w-full"
						value={value.status}
						style={{borderRadius:"25px",}}
						classes={{ root: 'text-14' }}
						placeholder="Write something.."
						multiline
						rows="3"
						rowsMax="8"
						margin="none"
						disableUnderline
					/>
					
							
							<AppBar
								className="card-footer flex flex-row border-t-1"
								position="static"
								color="default"
								elevation={0}
								style={{display:`${displayEditTweet}`,borderStyle:"none",background:"white"}}
							>
								<div className="flex-1 items-center" style={{background:""}} >
									<IconButton onClick={uploadImage}  aria-label="Add photo">
										<Icon>photo</Icon>
									</IconButton>
									<input style={{display:"none"}} multiple ref={inputFile} type="file" accept="image/*" onChange={imageSelectedHandler}>
									</input>
									<IconButton aria-label="Mention somebody">
										<Icon>person</Icon>
									</IconButton>
								
								</div>

								<div className="p-8">
								<IconButton onClick={()=>addTweet(index)} style={{textAlign:"right",marginRight:"10px"}} size="small" aria-label="Add location">
										<Icon>circle_add</Icon>
									</IconButton>
									<Button variant="contained" onClick={testUpload} color="primary" size="small" aria-label="post">
										Schedule
									</Button>
								</div>
							</AppBar>
							</div>
							)}
						</Card>	

					
	{/* </Box> */}
          </div>
        </Fade>
		
      </Modal>
	  </main>
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
			setTweet:customactions.setTweet
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}


function mapStateToProps(state){
	return {currentState:state}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamplePage);
