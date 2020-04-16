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


const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	modal: {
		display: 'flex',
		alignItems: 'top',
		justifyContent: 'center',
		// outline:0
		// top: "10%",
		// left: "15%",
		// transform: `translate(-10%, -15%)`,
	  },
	  paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height:"50%",width:"60%",
		marginTop:"5%",marginLeft:"5%",
		outline:0
	  },
}));

function TweetModal(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	const [displayEditTweet,setDisplayEditTweet]=useState('')
	const dispatch = useDispatch();
	const dialogstate = useSelector(({ fuse }) => fuse.dialog.state);
	const inputFile = useRef(null) 
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

	const addTweet = () =>{

	}

	const displayEdit=()=>{
		console.log("Element is focussed")
		setDisplayEditTweet("")
	}

	const testUpload=()=>{
	// const fd=new FormData()
	// fd.append('ppgrade',props.customReducers.upload.file,props.customReducers.upload.file.name)
	var ppGrade=firebase.getRootRef().child('ppgrade.jpg')
	ppGrade.put(props.currentState.customReducers.upload.file).then(function(snapshot) {
		console.log('Uploaded a blob or file!');
	  }); 
	}

	useEffect(()=>{
		firebase.getRedirectCode()
	}	)
	return (
		<div>
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
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
		  {props.currentState.customReducers.upload.tweet.map((value,index)=>
					<Card style={{width:"",background:""}} className="w-full items-end overflow-hidden">

					
						<Input
						key={index}
						startAdornment={	<Avatar
							style={{marginRight:"15px",
							
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
						style={{borderTopLeftRadius:"5%"}}
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
								style={{display:`${displayEditTweet}`}}
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
								<IconButton style={{textAlign:"right",marginRight:"10px"}} size="small" aria-label="Add location">
										<Icon>circle_add</Icon>
									</IconButton>
									<Button variant="contained" onClick={testUpload} color="primary" size="small" aria-label="post">
										Schedule
									</Button>
								</div>
							</AppBar>
						</Card>	

					)}

          </div>
        </Fade>
      </Modal>
				
				</div>


			

		
	
	);
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setUpload:customactions.setUpload,
			setStatus:customactions.setStatus,
			addSubtweet:customactions.addSubtweet
			// getAuthFunc:userActions.getAuthFunction
		},
		dispatch
	);
}


function mapStateToProps(state){
	return {currentState:state}
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamplePage);
