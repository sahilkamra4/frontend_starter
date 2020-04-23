import * as customActions from 'app/store/actions/customactions'
import FirebaseService from 'app/services/firebaseService'
// import { UPLOAD_IMAGE } from 'app/store/actions/customactions'

const initialState={
    time:"",
    tweet_id:"",
    user_id:"",
    tweet:[{
        status:"",
        tweet_thread:0,
        tweet_image:"",
        image_url:"",
    }]
}

const upload =(state=initialState,action)=>{

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

        case customActions.SET_TWEET:{
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

        case customActions.ADD_SUBTWEET:{

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

        case customActions.SET_DOWNLOAD_URL:

            var newState={...state}
            console.log(action.value)
            newState.tweet[action.thread_index].image_url=action.value

            return{
                ...newState
            }
        case customActions.SAVE_TWEET:
            var newState={...state}
            newState.tweet_id=action.tweet_id
            newState.user_id=action.user_id
            for(let i in newState.tweet){
                newState.tweet[i].tweet_image=""
            }

            FirebaseService.saveTweet(newState,action.tweet_id)
            return {
                ...initialState
            }

        case customActions.RESET_STATE:
            return {
                ...initialState
            }



        default:{
                console.log("This is happening")
                return state;
        }
    }

}
export default upload