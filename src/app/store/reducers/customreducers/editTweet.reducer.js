import * as customActions from 'app/store/actions/customactions'
import FirebaseService from 'app/services/firebaseService'
import moment from 'moment'

// import { UPLOAD_IMAGE } from 'app/store/actions/customactions'
var currentDateTime=moment(new Date())
currentDateTime.add(30,'m')
var currentDateTimeDatabase=new Date()
// console.log(FirebaseService.timestamp.fromDate(new Date()))
// console.log(currentDateTimeDatabase)
const initialState={
    // post_time_database:currentDateTimeDatabase,
    post_time:currentDateTime.format(),
    post_time_formatted:currentDateTime.format("MMM DD, hh:mm a"),
    tweet_id:"",
    user_id:"",
    tweet:[{
        status:"",
        tweet_thread:0,
        tweet_image:"",
        image_url:"",
    }]
}

const edit = (state=initialState,action)=>{

    console.log(state)
    console.log(action)

    switch(action.type){
        case customActions.SET_IMAGE:{
            console.log(action.thread_index)
            var newState={...state}
            newState.tweet[action.thread_index]['tweet_image']=action.payload
            // action

            return{
                ...newState
              
            }
        }

        case customActions.SET_TWEET_EDIT:{
            var currentState={...state}
            console.log(currentState)
            var value=action.value
            var thread_index=action.thread_index
            currentState.tweet[thread_index]={
                ...currentState.tweet[thread_index],
                status:value
            }
            var newState={
                ...currentState,
                tweet:currentState.tweet
            }
            
            return newState
        }

        case customActions.ADD_SUBTWEET_EDIT:{

            var currentState={...state}
            var tweet_index=action.tweet_index
           console.log(state)
           console.log(initialState)
           console.log(action)
           console.log(tweet_index)
            tweet_index=tweet_index+1

            var newTweet={

                files:"ff",
                status:"",
                tweet_thread:tweet_index
            

            }
            var newTweetArr=[]
            console.log(currentState.tweet)
            console.log(typeof currentState.tweet)
            if(tweet_index-1 ==currentState.tweet.length){
                console.log(tweet_index)
                 newTweetArr=currentState.tweet.push(newTweet)
            }
            else{
                var fruits = ["Banana", "Orange", "Apple", "Mango"];
                fruits.splice(2, 0, "Lemon", "Kiwi");
                console.log(fruits)
                fruits.splice(tweet_index, 0, newTweet, "Kiwi");
                console.log(tweet_index)
                console.log(fruits)
                console.log(currentState.tweet)
                currentState.tweet.splice(tweet_index,0,newTweet)
                console.log(currentState.tweet)
            newTweetArr= currentState.tweet
            }
            console.log(newTweetArr)
           var newState=currentState
           newState.tweet=newTweetArr
            console.log(newState)
           // let newState=currentState.tweet.append(newTeet)
            return newState
        }

        case customActions.SET_DOWNLOAD_URL_EDIT:

            var newState={...state}
            console.log(action.value)
            newState.tweet[action.thread_index].image_url=action.value

            return{
                ...newState
            }
        case customActions.SAVE_TWEET_EDIT:
            var newState={...state}
            if(!newState.post_time_database){
            newState.post_time_database=FirebaseService.timestamp.fromDate(moment(newState.post_time).toDate())

            }
            newState.tweet_id=action.tweet_id
            newState.user_id=action.user_id
            for(let i in newState.tweet){
                newState.tweet[i].tweet_image=""
            }

        //    FirebaseService.saveTweet(newState,action.tweet_id)
            return {
                ...initialState
            }

        case customActions.RESET_STATE_EDIT:
            console.log("Reached reset state")
            
            let freshState={...initialState}
            freshState= { post_time:currentDateTime.format(),
            post_time_formatted:currentDateTime.format("MMM DD, hh:mm a"),
            tweet_id:"",
            user_id:"",
            tweet:[{
                status:"",
                tweet_thread:0,
                tweet_image:"",
                image_url:"",
            }]}
            console.log(freshState)
            return freshState

        case customActions.HANDLE_DATE_CHANGE_EDIT:
            let newTweetState={...state}
            console.log(action.event)
            newTweetState.post_time_database=FirebaseService.timestamp.fromDate( action.event.toDate()) 
            newTweetState.post_time=action.event.format()
            newTweetState.post_time_formatted=action.event.format("MMM DD, hh:mm a")
        return{
            ...newTweetState
        }
        case customActions.REMOVE_TEMP_IMAGE_EDIT:
        let freshTweetState={...state}
        freshTweetState.tweet[action.index].tweet_image=""    
        return{
            ...freshTweetState
            }
        case customActions.REMOVE_SUBTWEET_EDIT:
            let myNewState={...state}
        if(state.tweet.length==1){
            
        }
        else{
            console.log(myNewState)
            console.log(action.index)
            myNewState.tweet.splice(action.index,1)
            console.log(myNewState)

        }
          
            return {
                ...myNewState
            }
        
        case customActions.FETCH_GIVEN_TWEET:
            var givenState={...action.payload}
        return {
            ...givenState
        }


        default:{
                console.log("This is happening edit")
                // let newTweetState={...state}

                // newTweetState.default_time=FirebaseService.timestamp.fromDate(moment(newTweetState.post_time).toDate())
                return state;
        }
    }

}
export default edit