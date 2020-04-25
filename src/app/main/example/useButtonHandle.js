import { useState } from 'react';
import firebase from 'app/services/firebaseService'
import {uuid} from 'uuidv4'
import moment from 'moment'




const useButtonHandle =({props,dateState,scheduledTweets,dialogstate,tweetState})=>{

    const [open, setOpen] = useState(false);
    const [imageTempUrl,setTempUrl]=useState("")
    const [isButtonDisabled,setIsButtonDisabled]=useState(true)
    const [displayEditTweet,setDisplayEditTweet]=useState('')


const randomFunc =()=>{
    console.log("Rando")
}

const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
	//   alert("Are you sure you want to close the modal")
    setOpen(false);
  };

  const handleDateChange=(event)=>{
	props.handleDateChange(event)
  }
  const tempImageRemove=(event,index)=>{
	props.removeUploadImage(index)
  }


  const imageSelectedHandler=(event,index)=>{
    var files= event.target.files
    if(files.length >4){
        console.log("Cannt upload more than 4 files")
    }
    for(let i=0;i<files.length;i++){

    }
    console.log(event.target.files[0])
    console.log(event.target.files[0].type)
    var temporary_url=URL.createObjectURL(event.target.files[0])
    setTempUrl(temporary_url)
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

const setTweetWrapper=(event,index)=>{
    console.log(event)
    console.log(index)
    
    props.setTweet(event.target.value,index)

    for(let i=0;i<tweetState.tweet.length;i++){
        if(tweetState.tweet[index].status.length <= 0){
            setIsButtonDisabled(true)
            break;
        }
        else {
            setIsButtonDisabled(false)
        }
    }

}
const displayEditDate=()=>{
	props.displayDate()
}

const displayEdit=()=>{
    console.log("Element is focussed")
    setDisplayEditTweet("")
}

const testUpload=async ()=>{
	// const fd=new FormData()
	// fd.append('ppgrade',props.customReducers.upload.file,props.customReducers.upload.file.name)
	console.log("Example test upload working")
	let tweet_id=uuid()
	//   send images to storage
	for (let item in tweetState.tweet){
		if(tweetState.tweet[item].tweet_image && tweetState.tweet[item].tweet_image != ""){
		console.log(tweet_id)
		var image_ref=firebase.getRootRef().child(`${dialogstate.auth.user.uid}/${tweet_id}/${tweetState.tweet[item].tweet_image.name}.jpg`)
		let snapshot= await image_ref.put(tweetState.tweet[item].tweet_image).catch(err=>console.log(err))
		console.log('Uploaded a blob or file!');
		let downloadURL=await snapshot.ref.getDownloadURL().catch(err=>console.log(err))
		console.log("File available at", downloadURL);
		props.setDownloadUrl(downloadURL,item)
		// tweetState.tweet[item].image_url=downloadURL
		}
		  
	}
	let user_id=dialogstate.auth.user.uid
	console.log(user_id)
	await props.saveTweet(tweet_id,user_id)

	if(!tweetState.post_time_database){
		tweetState.post_time_database=firebase.timestamp.fromDate(moment(tweetState.post_time).toDate())

		}
	tweetState.tweet_id=tweet_id
	tweetState.user_id=dialogstate.auth.user.uid
	for(let i in tweetState.tweet){
			tweetState.tweet[i].tweet_image=""
		}
	await firebase.saveTweet(tweetState,tweet_id).catch(err=>console.log(err))
	props.resetState()
	props.showMessage({message: 'Tweet Scheduled Successfully',autoHideDuration:2000,variant:"success"})
	console.log("tweet saved")
}



    return {
        randomFunc,
        handleOpen,
        handleClose,
        open,
        handleDateChange,
        tempImageRemove,
        imageSelectedHandler,
        imageTempUrl,
        setTweetWrapper,
        isButtonDisabled,
        setIsButtonDisabled,
        testUpload,
        displayEditDate,
        displayEdit,
        displayEditTweet
    }


}

export default useButtonHandle